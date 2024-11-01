export { default } from 'next-auth/middleware'

// Redirect to login for admin path
export const config = { matcher: ['/admin/'] }
