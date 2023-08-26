"use client";

import { useEffect, useState } from "react";

const User = ({ params }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        // Fetch user details using the API route
        const res = await fetch(
          `http://localhost:3000/api/users/${params._id}`
        );
        const userData = await res.json();
        const userDetails = userData.data;
        setUser(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, [params._id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {user.fullName}</p>
      <p>ID: {user.studentID}</p>
      <p>email: {user.email}</p>
      <p>mobile Number: {user.mobileNumber}</p>
      {/* Render other user details */}
    </div>
  );
};

export default User;
