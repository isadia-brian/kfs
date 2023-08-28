import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/models/UserSchema";
import { hash } from "bcrypt";

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
  let statusCode;

  // Assuming passed data is in JSON format: { fullName, email, mobile, password }
  const { fullName, password, studentNumber, username, mobile, email } = body;

  if (
    fullName == "" ||
    password == "" ||
    studentNumber == "" ||
    mobile == "" ||
    username == "" ||
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

      userExist = await User.findOne({ studentID: studentNumber });

      const query = {
        $or: [
          { studentID: studentNumber },
          { email: email },
          { username: username },
        ],
      };

      userExist = await User.findOne(query);

      if (!userExist) {
        const hashedPassword = await hash(password, 10);

        const newUser = new User({
          fullName,
          password: hashedPassword,
          studentID: studentNumber,
          mobileNumber: mobile,
          email,
          username,
        });

        await newUser.save();
        statusCode = 201; // created status code

        return NextResponse.json(
          { message: "User created successfully" },
          { status: statusCode }
        );
      }

      if (userExist.studentID === studentNumber) {
        statusCode = 409; // error status code
        return NextResponse.json(
          { message: "This student ID has been taken" },
          { status: statusCode }
        );
      } else if (userExist.email === email) {
        statusCode = 409; //error status code
        return NextResponse.json(
          { message: "This email has already been taken" },
          { status: statusCode }
        );
      } else if (userExist.username === username) {
        statusCode = 409; //error status code
        return NextResponse.json(
          { message: "This username has already been taken" },
          { status: statusCode }
        );
      }
    } catch (error) {
      statusCode = 400; // error status code
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
