import {NextRequest, NextResponse} from 'next/server';
import {deCrypt} from './lib/session';  

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('session')?.value;
    const pathname = req.nextUrl.pathname;
    const authOnlyPaths = ['/login', '/registration'];
    
    // If user is logged in and tries to access login/registration, redirect to dashboard
    if (authOnlyPaths.includes(pathname)) {
        if (token) {
            const payload = await deCrypt(token);
            if (payload) {
                const dashboardUrl = new URL('/dashboard', req.url);
                return NextResponse.redirect(dashboardUrl);
            }
        }
        return NextResponse.next();
    }
    
    // For dashboard routes, check authentication
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }
        const payload = await deCrypt(token);
        if (!payload) {
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/registration'],
};

