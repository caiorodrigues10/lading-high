import { NextResponse } from "next/server";

function removeServerCookie(response: NextResponse) {
  response.cookies.delete("landing.token");
  response.cookies.delete("landing.name");
  response.cookies.delete("landing.email");
  response.cookies.delete("landing.accessLevel");
  response.cookies.delete("landing.refreshToken");
  response.cookies.delete("landing.id");
}

export { removeServerCookie };
