'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    useEffect(() => {
        // Log the error for debugging
        if (error) {
            console.error('Authentication error:', error);
        }
    }, [error]);

    const getErrorMessage = (error: string | null) => {
        switch (error) {
            case 'CredentialsSignin':
                return 'Invalid email or password';
            case 'AccessDenied':
                return 'Access denied. You do not have permission to access this resource.';
            case 'Configuration':
                return 'There is a problem with the server configuration.';
            case 'DatabaseError':
                return 'Database connection error. Please try again later.';
            default:
                return 'An error occurred during authentication. Please try again.';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Authentication Error
                    </h2>
                    <div className="mt-2 text-center text-sm text-gray-600">
                        {getErrorMessage(error)}
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Link
                        href="/auth/signin"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Return to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
} 