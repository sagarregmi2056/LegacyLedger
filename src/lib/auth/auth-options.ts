import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@/models/User';
import connectDB from '@/lib/db/mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter an email and password');
          }

          // Connect to database
          try {
            await connectDB();
          } catch (error) {
            console.error('Database connection error:', error);
            throw new Error('Database connection failed. Please try again later.');
          }

          // Find user
          let user;
          try {
            user = await User.findOne({ email: credentials.email.toLowerCase() });
          } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Error finding user. Please try again.');
          }

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Verify password
          try {
            const isValid = await user.comparePassword(credentials.password);
            if (!isValid) {
              throw new Error('Invalid password');
            }
          } catch (error) {
            console.error('Password comparison error:', error);
            throw new Error('Error verifying password. Please try again.');
          }

          // Return user data
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
}; 