/**
 * Login page
 */
'use client';
import { useActionState } from "react";
import { loginUser } from "@/lib/login";
import { redirect } from "next/navigation";

export default function Login() { 
    const [state, action] = useActionState(loginUser, undefined);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>
                <form action={action} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                            placeholder="Enter your email" 
                        />
                    </div>
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
                    )}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" 
                            id="password"
                            name="password" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                            placeholder="Enter your password" 
                        />  
                    </div>
                    {state?.errors?.password && (
                        <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
                    )}
                    {state?.errors?.isValid && (
                        <p className="text-red-500 text-sm">{state.errors.isValid[0]}</p>
                    )}
                    <button 
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                        Login
                    </button>                    

                    {state?.success?.isValid && (
                        redirect("/dashboard")
                    )}
                </form>
            </div>
        </div>
    );
}
