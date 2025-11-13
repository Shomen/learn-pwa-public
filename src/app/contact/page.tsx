/**
 * Contact Page
 */
'use client';
import { useActionState, useState, useEffect, startTransition } from 'react';
import { submitContactForm } from '@/lib/contact';
import Image from 'next/image';

// Generate captcha values
const generateCaptchaValues = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
};

export default function ContactPage() { 
    const [state, action] = useActionState(submitContactForm, undefined);
    const [captcha, setCaptcha] = useState<{ num1: number; num2: number; answer: number } | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Mark component as mounted on client side
    useEffect(() => {
        startTransition(() => {
            setIsClient(true);
            setCaptcha(generateCaptchaValues());
        });
    }, []);

    // Generate new captcha
    const generateCaptcha = () => {
        setCaptcha(generateCaptchaValues());
    };

    // Reset captcha on form error
    useEffect(() => {
        if (isClient && (state?.errors?.captcha || state?.errors?.isSuccess)) {
            startTransition(() => {
                setCaptcha(generateCaptchaValues());
            });
        }
    }, [state, isClient]);

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Background Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/Contact3.webp"
                    alt="Contact us"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                {/* Optional overlay text */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg md:text-xl text-white/90">
                            Have a question or want to learn more? We&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-lg">
                    {/* Mobile Header */}
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Get in Touch
                        </h1>
                        <p className="text-gray-600">
                            Have a question or want to learn more? We&apos;d love to hear from you.
                        </p>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-900">
                        Send us a Message
                    </h2>
                    <form action={action} className="space-y-6">
                        {/* Honeypot field - hidden from users */}
                        <input
                            type="text"
                            name="honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                            className="hidden"
                            aria-hidden="true"
                        />

                        {/* Hidden captcha answer */}
                        {isClient && captcha && (
                            <input
                                type="hidden"
                                name="captchaAnswer"
                                value={captcha.answer}
                            />
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text"
                                id="name" 
                                name="name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
                                placeholder="Enter your full name"
                            />
                            {state?.errors?.name && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
                                placeholder="Enter your email address" 
                            />
                            {state?.errors?.email && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                id="description"
                                name="description"
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none" 
                                placeholder="Tell us how we can help you..."
                            ></textarea>
                            {state?.errors?.description && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.description[0]}</p>
                            )}
                        </div>

                        {/* Captcha */}
                        <div suppressHydrationWarning>
                            <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
                                Security Check <span className="text-red-500">*</span>
                            </label>
                            {isClient && captcha ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border border-gray-300 font-mono text-lg font-semibold">
                                        <span>{captcha.num1}</span>
                                        <span>+</span>
                                        <span>{captcha.num2}</span>
                                        <span>=</span>
                                    </div>
                                    <input 
                                        type="number"
                                        id="captcha" 
                                        name="captcha"
                                        required
                                        className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
                                        placeholder="?"
                                    />
                                    <button
                                        type="button"
                                        onClick={generateCaptcha}
                                        className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 transition duration-200"
                                        title="Refresh captcha"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border border-gray-300 font-mono text-lg font-semibold h-[48px] w-32">
                                        <span className="text-gray-400">Loading...</span>
                                    </div>
                                    <input 
                                        type="number"
                                        id="captcha" 
                                        name="captcha"
                                        required
                                        disabled
                                        className="flex-1 px-4 py-3 border border-gray-300 bg-gray-50" 
                                        placeholder="?"
                                    />
                                    <button
                                        type="button"
                                        disabled
                                        className="px-4 py-3 bg-gray-200 text-gray-400 cursor-not-allowed"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            {state?.errors?.captcha && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.captcha[0]}</p>
                            )}
                        </div>

                        {state?.errors?.isSuccess && (
                            <div className="p-4 bg-red-50 border border-red-200">
                                <p className="text-red-600 text-sm">{state.errors.isSuccess[0]}</p>
                            </div>
                        )}

                        {state?.success?.isSuccess && (
                            <div className="p-4 bg-green-50 border border-green-200">
                                <p className="text-green-600 text-sm font-medium">{state.success.isSuccess[0]}</p>
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 transition duration-200"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Information */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h3>
                        <div className="flex items-center text-gray-600">
                            <a 
                                href="mailto:shomenmuhury@yahoo.com"
                                className="flex items-center hover:text-purple-600 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                shomenmuhury@yahoo.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
