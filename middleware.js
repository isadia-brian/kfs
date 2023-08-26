import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export function customMiddleware(request) {
  const origin = request.headers.get("origin");
  console.log(origin);

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  // add application/json contenttype

  console.log("Middleware!");
  console.log(request.method);
  console.log(request.url);

  return response;
}

// combined custom middleware above with nextAuth middleware
export default withAuth(
  function combinedMiddleware(request) {
    // Call your custom middleware functionality
    customMiddleware(request);

    // Call the NextAuth.js provided middleware functionality
    // Modify and add your additional logic here
    // ...
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: "/api/:path*",
};
