import { promises as fs } from 'fs';
import path from 'path';

type User = {
    id: number;
    email: string;
    password: string;
    name: string;
};

export async function userData(email: string, password: string) {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'users.json');
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(fileContent) as User[];
        const user = users.find(u => u.email === email && u.password === password);
        return user || null;
    } catch (error) {
        console.error('Error reading users file:', error);
        return null;
    }
}