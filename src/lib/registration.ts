/**
 * User registration process
 */
'use server';
import {z} from 'zod';
import { redirect } from 'next/navigation';
import { saveData } from './savedata';

const formDataSchema = z.object({ 
    name: z.string().min(1, { message: "Name is required." }).trim(),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Invalid email address." }).trim(),
    password: z.string().min(1, { message: "Password is required." }).min(6, { message: "Password must be at least 6 characters long." }).trim(),
    isSuccess: z.string().optional(),
});

export async function registerUser(prevState: any, formData: FormData) {    
    const parsedData = formDataSchema.safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
       return {
        errors: parsedData.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = parsedData.data;

    // Save the user data (demo). In production use a real database.
    try {
        const res = await saveData({ name, email, password });
       // const body = await (res as Response).json();
        
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
                }
            };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return {
            errors: {
                isSuccess: ["An unexpected error occurred. Please try again."]
            }
        };
    }
}