// lib/auth.ts
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthUser extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies(); // 👈 fix: await here
    const token = cookieStore.get("authToken")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    return decoded;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getAuthenticatedUser()) !== null;
}
