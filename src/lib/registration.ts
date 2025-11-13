/**
 * User registration process
 */
'use server';
import {z} from 'zod';
import { saveData } from './savedata';
import { checkEmailExists } from './checkEmail';

/**
 * Check if email exists (server action for real-time validation)
 */
export async function checkEmail(email: string): Promise<{ exists: boolean }> {
    if (!email || typeof email !== 'string') {
        return { exists: false };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { exists: false };
    }

    const exists = await checkEmailExists(email);
    return { exists };
}

const formDataSchema = z.object({ 
    name: z.string().min(1, { message: "Name is required." }).trim(),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address." }).trim(),
    password: z.string().min(1, { message: "Password is required." }).min(6, { message: "Password must be at least 6 characters long." }).trim(),
    isSuccess: z.string().optional(),
});

export async function registerUser(prevState: unknown, formData: FormData) {    
    const parsedData = formDataSchema.safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
       return {
        errors: parsedData.error.flatten().fieldErrors,
        values: {
            name: formData.get('name') as string || '',
            email: formData.get('email') as string || '',
        }
        };
    }

    const { name, email, password } = parsedData.data;

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        return {
            errors: {
                email: ["This email is already registered. Please use a different email or log in."]
            },
            values: {
                name,
                email,
            }
        };
    }

    // Save the user data (demo). In production use a real database.
    try {
        const res = await saveData({ name, email, password });
        
        if (res=="success") {          
            return {
                success: {
                  isSuccess: ["Registration successful! You can now log in."]
               }
             };
        } else {
            return {
                errors: {
                    isSuccess: ["Registration failed. Please try again."]
                },
                values: {
                    name,
                    email,
                }
            };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return {
            errors: {
                isSuccess: ["An unexpected error occurred. Please try again."]
            },
            values: {
                name,
                email,
            }
        };
    }
}