import { promises as fs } from 'fs';
import path from 'path';

export async function saveData(data: unknown) {
  // If a Promise was passed (e.g. awaiting form data), await it; otherwise use directly
  const resolved = data instanceof Promise ? await data : data;
  const { name, email, password } = resolved as { name?: string; email?: string; password?: string };

  // Define the file path to your data file - using lib/data/users.json
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'users.json');

  // Read existing users
  type UserRecord = { id?: number; name?: string; email?: string; password?: string; [k: string]: unknown };
  let users: Array<UserRecord> = [];
  try {
    const file = await fs.readFile(filePath, 'utf8');
    users = JSON.parse(file) as Array<UserRecord>;
    if (!Array.isArray(users)) users = [];
  } catch {
    users = [];
  }

  // Generate the next auto-incremented ID
  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) : 0;
  const nextId = maxId + 1;

  // Add the new user with generated ID
  users.push({ id: nextId, name, email, password });

  // Save users back to the file
  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return 'success';
  } catch (error) {
    console.error('Error saving user data:', error);
    return 'error - '+error;
  }
}
