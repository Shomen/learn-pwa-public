'use server';
import {z} from 'zod';
import { createSessionToken, deleteSession } from './session';
import {userData} from './getuser';

const formDataSchema = z.object({
    email: z.string().min(1,{ message: "Email is required." }).email({ message: ' Invalid email address' }).trim(),
    password: z.string().min(1, { message: "Password is required." }).min(6, { message: ' Password must be at least 6 characters long' }).trim(),
    isValid: z.string().optional(),
});

export async function loginUser(prevState: unknown, formData: FormData) {    
    const parsedData = formDataSchema.safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
       return {
        errors: parsedData.error.flatten().fieldErrors,
        };
    }

    const { email, password } = parsedData.data;

    // Check user credentials against users.json
    const user = await userData(email, password);
    
    if (user) {
        // Create session token if credentials are valid
        await createSessionToken(email);
        return {
            success: {
                isValid: ["Valid email and password"]
            }
        };
    }

    return {
        errors: {
            isValid: ["Invalid email or password"]
        }
    };
    
}

export async function logout() {
    await deleteSession();
    return { success: true, redirectTo: "/login" };
}