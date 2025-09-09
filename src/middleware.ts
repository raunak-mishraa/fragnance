

// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   console.log(pathname)
//   // check if accessing protected routes
//   if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
//     // Allow unauthenticated access to /admin/login
//     if (pathname === "/admin/login") {
//       return NextResponse.next();
//     }

//     const token = req.cookies.get("authToken")?.value;
//     console.log("checking", token)

//     if (!token) {
//       console.log("enter")
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//       console.log("entered try")
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//         id: string;
//         email: string;
//         role: string;
//       };
//       console.log(decoded,"try")

//       if (pathname.startsWith("/admin") && decoded.role !== "admin") {
//         return NextResponse.redirect(new URL("/unauthorized", req.url));
//       }

//       if (pathname.startsWith("/user") && decoded.role !== "user") {
//         return NextResponse.redirect(new URL("/unauthorized", req.url));
//       }

//       return NextResponse.next();
//     } catch (err) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*"],
//   runtime: "nodejs",   // ✅ ensure jwt works with env
// };

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("authToken")?.value;

  // If logged in -> block /login and /otp-verification
  if (token && (pathname === "/login" || pathname === "/otp-verification")) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
        role: string;
      };

      if (decoded.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      if (decoded.role === "user") {
        return NextResponse.redirect(new URL("/user/profile", req.url));
      }
    } catch (err) {
      // if token invalid, just let them access login again
      return NextResponse.next();
    }
  }

  // Protected routes check
  if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
    // Always allow admin login page
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
        role: string;
      };

      // Admin restriction: only allow dashboard
      if (decoded.role === "admin" && pathname.startsWith("/admin")) {
        if (pathname !== "/admin/dashboard") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
      }

      // Role-based access
      if (pathname.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      if (pathname.startsWith("/user") && decoded.role !== "user") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/otp-verification",
  ],
  runtime: "nodejs",
};
