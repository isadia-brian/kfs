import { NextResponse } from "next/server";

export async function GET(request) {
  const userData = {
    studentID: "kfs-2023-213-213-213",
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    mobile: "+254796661363",
    password: "Ab12345678",
  };

  const statusCode = 200; // success status code

  return NextResponse.json({ data: userData }, { status: statusCode });
}

export async function POST(request) {
  const body = await request.json();

  // Assuming passed data is in JSON format: { fullName, email, mobile, password }

  console.log(body);

  // Save user data to the database or perform other operations as needed

  const statusCode = 201; // created status code

  return NextResponse.json(
    { message: "User created successfully" },
    { status: statusCode }
  );
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
  const { studentID } = JSON.parse(body);

  // Delete user data from the database or perform other operations as needed

  const statusCode = 200; // success status code

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: statusCode }
  );
}
