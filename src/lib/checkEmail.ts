import { promises as fs } from 'fs';
import path from 'path';

/**
 * Check if an email already exists in the users database
 */
export async function checkEmailExists(email: string): Promise<boolean> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'users.json');
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(fileContent) as Array<{ email?: string }>;
        if (!Array.isArray(users)) return false;
        
        // Check if email exists (case-insensitive)
        return users.some(user => user.email?.toLowerCase() === email.toLowerCase());
    } catch {
        return false;
    }
}

