// lib/auth.ts
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL = 60 * 60 * 24; // 24h in seconds

export async function getSession() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('admin_session');


  if (!sessionId) return null;

  // Check if admin exists
  const admin = await prisma.admin.findUnique({
    where: { id: sessionId },
  });

  if (!admin) return null;

  // 🔄 Refresh cookie (rolling session)
  const newCookieStore = cookies();
  newCookieStore.set(SESSION_COOKIE, admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });

  return admin;
}

export function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);
}
