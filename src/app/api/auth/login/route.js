import { getUsersCollection } from "@/lib/db";
export async function POST(req) {
  const { email, password } = await req.json();
    const usersCollection = await getUsersCollection();
  

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  if (user.password !== password) {
    // 🔒 In real app, hash & compare passwords instead of plain text
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return Response.json({ message: "Login successful", user });
}
