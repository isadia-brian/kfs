import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/models/UserSchema";

import { NextResponse } from "next/server";

export async function GET(request) {
  const _id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let user;
    await connectMongoDB();
    user = await User.findById(_id);

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: user },
      { status: 200 },
      { message: "User found" }
    );
  } catch (error) {
    const statusCode = 503;
    return NextResponse.json(
      { message: "Error connecting to database" },
      { status: statusCode }
    );
  }
}
