import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/models/UserSchema";

export async function GET(request) {
  try {
    await connectMongoDB();
    const users = await User.find({});
    const statusCode = 200; // success status code
    return NextResponse.json({ users }, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Connecting", error },
      { status: 503 }
    );
  }
}

export async function POST(request) {
  const body = await request.json();

  // Assuming passed data is in JSON format: { fullName, email, mobile, password }
  const { fullName, password, studentID, mobileNumber, email } = body;

  if (
    fullName == "" ||
    password == "" ||
    studentID == "" ||
    mobileNumber == "" ||
    email == ""
  ) {
    const statusCode = 400; // error status code
    return NextResponse.json(
      { message: "Fill in all fields" },
      { status: statusCode }
    );
  } else {
    try {
      await connectMongoDB();
      let userExist;

      const query = { $or: [{ studentID: studentID }, { email: email }] };

      userExist = await User.findOne(query);

      if (userExist) {
        const statusCode = 400; // error status code
        return NextResponse.json(
          { message: "This user already exists" },
          { status: statusCode }
        );
      } else {
        const newUser = new User({
          fullName,
          password,
          studentID,
          mobileNumber,
          email,
        });

        // Save user data to the database
        await newUser.save();

        const statusCode = 201; // created status code

        return NextResponse.json(
          { message: "User created successfully" },
          { status: statusCode },
          { data: newUser }
        );
      }
    } catch (error) {
      const statusCode = 400; // error status code
      return NextResponse.json(
        { message: "Error connecting to database", error },
        { status: statusCode }
      );
    }
  }
}

export async function PUT(request) {
  const { body } = await request.json();
  // Assuming passed data is in JSON format: { studentID, fullName, email, mobile }
  const { studentID, fullName, email, mobile, password } = body;

  // Update user data in the database or perform other operations as needed

  const statusCode = 200; // success status code

  return NextResponse.json(
    { message: "User updated successfully" },
    { status: statusCode }
  );
}

export async function PATCH(request) {
  const { body } = await request.json();
  // Assuming passed data is in JSON format: { studentID, fullName }
  const { studentID, fullName } = body;

  // Perform partial update of user data in the database or perform other operations as needed

  const statusCode = 200; // success status code

  return NextResponse.json(
    { message: "User partially updated successfully" },
    { status: statusCode }
  );
}

export async function DELETE(request) {
  const { body } = await request.json();
  // Assuming passed data is in JSON format: { studentID }
  const { studentID } = body;

  // Delete user data from the database or perform other operations as needed

  const statusCode = 200; // success status code

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: statusCode }
  );
}
