// app/api/me/route.ts
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({ user });
}
