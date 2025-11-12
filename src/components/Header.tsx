/**
 * Header component
 */
import Link from "next/link";
import { cookies } from "next/headers";
import { deCrypt } from "@/lib/session";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";

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
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <NavLink href="/" className="hover:underline pb-1">
                                Home
                            </NavLink>
                        </li>
                        
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink href="/dashboard" className="hover:underline pb-1">
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <LogoutButton/>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink href="/registration" className="hover:underline pb-1">
                                        Registration
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href="/login" className="hover:underline pb-1">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}
                        
                        <li>
                            <NavLink href="/contact" className="hover:underline pb-1">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
                
                <MobileMenu isLoggedIn={isLoggedIn} />
            </nav>
        </header>
    );
}