/**
 * Registration Page
 */
'use client';
import { useActionState } from 'react';
import { registerUser } from '@/lib/registration';
import { redirect } from 'next/navigation';

export default function RegistrationPage() { 
    const [state, action] = useActionState(registerUser, undefined);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h2>
                <form action={action} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text"
                            id="name" 
                            name='name'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                            placeholder=" Enter your full name"
                        />
                    </div>
                    {state?.errors?.name && (
                        <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            id="email" 
                            name='email'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                            placeholder=" Enter your email"
                        />
                    </div>
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
                    )}
                    <div>   
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name='password'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                            placeholder=" Create a password"
                        />  
                    </div>
                    {state?.errors?.password && (
                        <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
                    )}
                    <button 
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                        Register
                    </button>
                    {state?.errors?.isSuccess && (
                        <p className="text-green-500 text-sm">{state.errors.isSuccess[0]}</p>
                    )}
                    {state?.success?.isSuccess && (
                        redirect('/login')
                    )}
                </form>
            </div>
        </div>
    );
}