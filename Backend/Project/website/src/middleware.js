import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Middleware logic

  // // Example: redirect if user is not logged in
  const isLoggedIn = request.cookies.get('user_token')?.value ?? 0;

  if ((isLoggedIn == 0) && request.nextUrl.pathname.startsWith('/my-dashboard')) {
    return NextResponse.redirect(new URL('/login-register', request.url))
  }

  if ((isLoggedIn == 0) && request.nextUrl.pathname.startsWith('/checkout')) {
    return NextResponse.redirect(new URL('/login-register', request.url))
  }

  if ((isLoggedIn != 0) && request.nextUrl.pathname.startsWith('/login-register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

   // Handle simple requests
    const response = NextResponse.next()
    return response;
}