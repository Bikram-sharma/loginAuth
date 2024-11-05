import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  // Define which paths are public and do not require authentication
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  
  // Retrieve the authentication token from cookies
  const token = request.cookies.get('token')?.value || ''

  // If the user is on a public path but has a token, redirect to home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If the user is on a protected path and doesn't have a token, redirect to login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/profile', // Protect this route
    '/login',
    '/signup',
    '/verifyemail'
  ]
}
