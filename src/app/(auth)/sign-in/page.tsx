'use client';

import Link from 'next/link';
import LoginForm from './components/login-form';

export default function page() {


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg p-8 space-y-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome Back to Quiz Master
                    </h1>
                    <p className="mb-4">Sign in to continue your journey</p>
                </div>


                <LoginForm />

                <div className="text-center mt-4">
                    <p>
                        Not a member yet?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}