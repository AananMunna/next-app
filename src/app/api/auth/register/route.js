import bcrypt from "bcrypt";
import { getUsersCollection } from "@/lib/db";

export async function POST(req) {
        const usersCollection = await getUsersCollection();
    
  try {
    const { name, email, password } = await req.json();

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      userRole: 'customer'
    });

    return Response.json(
      { message: "User registered", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
