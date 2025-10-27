/**
 * Header component
 */
import Link from "next/link";
import { cookies } from "next/headers";
import { deCrypt } from "@/lib/session";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";

export default async function Header() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;
    
    let isLoggedIn = false;
    if (sessionToken) {
        const payload = await deCrypt(sessionToken);
        isLoggedIn = !!payload;
    }

    return (
        <header className="w-full py-4 bg-lh-menu-background text-white">
            <nav className="max-w-7xl mx-auto px-4 flex justify-between relative">
                <Link href="/">
                    <div className="size-[40px] justify-center flex items-center text-center text-lh-logo-text bg-lh-logo-bg rounded-full font-bold">{"{LH}"}</div>
                </Link>

                 <div className="hidden md:flex">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        
                        {isLoggedIn ? (
                            <li>
                                <LogoutButton />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/registration" className="hover:underline">
                                        Registration
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="hover:underline">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        
                        <li>
                            <Link href="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                
                <MobileMenu isLoggedIn={isLoggedIn} />
            </nav>
        </header>
    );
}