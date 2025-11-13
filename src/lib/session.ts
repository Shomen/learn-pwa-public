import 'server-only';
import { SignJWT, jwtVerify} from 'jose';
import { cookies } from 'next/headers';

const secretkey = process.env.JWT_SECRET;
if (!secretkey) {
  throw new Error('JWT_SECRET environment variable is not set. Please set it in your .env.local file.');
}
const encodedkey = new TextEncoder().encode(secretkey);

type SessionPayload = {
  userEmail: string;
  expiresIn: Date;
};

export async function createSessionToken(userEmail: string) {
    const expiresIn = new Date(Date.now() + 1000 * 60 * 60); // 1 minute
    const session = await enCrypt({userEmail, expiresIn});

    const cookieStore = await cookies();
    cookieStore.set({
        name: 'session',
        value: session, 
        httpOnly: true,
        secure: true,
        expires: expiresIn,
    });

}

export async function enCrypt(payload : SessionPayload) {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('1h')
        .sign(encodedkey);
    return token;
}

export async function deCrypt(token: string) {
    try {
        const { payload } = await jwtVerify(token, encodedkey,{
            algorithms: ['HS256'],
        });
        return payload;
    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}