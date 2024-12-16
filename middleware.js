

import { NextResponse } from "next/server";

export function middleware(request) {
  const cookies = request.cookies;
  let user = null;
  
  try {
    const userCookie = cookies.get('user');
    user = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
  }

  const url = request.nextUrl.clone();
  const { pathname } = url;
  const userType = user?.type;

  const routes = {
   admin : ["/dashboard/area", "/dashboard/events","/dashboard/devis"],
   superadmin : [ "/dashboard/rooms"],
  };

  // Redirect to login if trying to access dashboard without proper role
  if (!userType && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (userType === "user" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent access based on user type and specific routes
  if (routes[userType]?.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect logged-in users away from the login page
  if (userType && pathname === "/login") {
    return NextResponse.redirect(new URL(userType === "user" ? "/" : "/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};
