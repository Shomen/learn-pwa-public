import {NextRequest, NextResponse} from 'next/server';
import {deCrypt} from './lib/session';  

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('session')?.value;
    const publicPaths = ['/login', '/registration', '/'];
    const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
    if (isPublicPath) {
        return NextResponse.next();
    }
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }
    const payload = await deCrypt(token);
    if (!payload) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
};

