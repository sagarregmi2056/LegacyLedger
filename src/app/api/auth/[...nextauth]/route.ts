import NextAuth from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';

// Create the NextAuth handler with the imported options
const handler = NextAuth(authOptions);

// Export the handler as GET and POST methods
export { handler as GET, handler as POST }; 