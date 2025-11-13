/**
 * Registration Page
 */
'use client';
import { useActionState, useState, useEffect, useRef } from 'react';
import { registerUser, checkEmail } from '@/lib/registration';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() { 
    const [state, action] = useActionState(registerUser, undefined);
    const router = useRouter();
    
    // Controlled inputs to preserve form data on errors
    const [formData, setFormData] = useState({
        name: state?.values?.name || '',
        email: state?.values?.email || '',
        password: '',
    });

    // Email validation state for real-time checking
    const [emailError, setEmailError] = useState<string | null>(null);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const emailCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Update form data when state changes (preserves values on error)
    useEffect(() => {
        if (state?.values) {
            setFormData(prev => ({
                ...prev,
                name: state.values.name || prev.name,
                email: state.values.email || prev.email,
            }));
        }
    }, [state]);

    // Redirect on success
    useEffect(() => {
        if (state?.success?.isSuccess) {
            router.push('/login');
        }
    }, [state, router]);

    // Real-time email validation
    const checkEmailDuplicate = async (email: string) => {
        // Clear previous timeout
        if (emailCheckTimeoutRef.current) {
            clearTimeout(emailCheckTimeoutRef.current);
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(null);
            setIsCheckingEmail(false);
            return;
        }

        setIsCheckingEmail(true);
        setEmailError(null);

        // Debounce: wait 500ms after user stops typing
        emailCheckTimeoutRef.current = setTimeout(async () => {
            try {
                const result = await checkEmail(email);
                
                if (result.exists) {
                    setEmailError('This email is already registered. Please use a different email.');
                } else {
                    setEmailError(null);
                }
            } catch (error) {
                console.error('Error checking email:', error);
                // Don't show error on network failure, let server validation handle it
            } finally {
                setIsCheckingEmail(false);
            }
        }, 500);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setFormData(prev => ({ ...prev, email }));
        
        // Clear server error when user starts typing
        if (state?.errors?.email) {
            // The error will be cleared on next form submission
        }
        
        // Check for duplicate email
        checkEmailDuplicate(email);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, name: e.target.value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, password: e.target.value }));
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (emailCheckTimeoutRef.current) {
                clearTimeout(emailCheckTimeoutRef.current);
            }
        };
    }, []);

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
                            value={formData.name}
                            onChange={handleNameChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" 
                            placeholder=" Enter your full name"
                        />
                    </div>
                    {state?.errors?.name && (
                        <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <input 
                                type="email"
                                id="email" 
                                name='email'
                                value={formData.email}
                                onChange={handleEmailChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                                    emailError || (state && state.errors && state.errors.email) ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder=" Enter your email"
                            />
                            {isCheckingEmail && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                </div>
                            )}
                        </div>
                        {(emailError || state?.errors?.email) && (
                            <p className="text-red-500 text-sm mt-1">
                                {emailError || (state?.errors?.email?.[0])}
                            </p>
                        )}
                    </div>
                    <div>   
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name='password'
                            value={formData.password}
                            onChange={handlePasswordChange}
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
                        <p className="text-red-500 text-sm text-center">{state.errors.isSuccess[0]}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
