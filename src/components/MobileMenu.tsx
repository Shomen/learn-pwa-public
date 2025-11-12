'use client';
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import MobileNavLink from "./MobileNavLink";

interface MobileMenuProps {
    isLoggedIn: boolean;
}

export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="md:hidden">
            <button 
                id="mobile-menu-button" 
                className="md:hidden cursor-pointer" 
                aria-haspopup="true"
                onClick={toggleMenu}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>                   

            <ul id="mobile-menu" className={`fixed inset-0 z-[100] bg-black/40 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-6 ${isMenuOpen ? 'flex' : 'hidden'}`}>
                <li>
                    <MobileNavLink href="/" onClick={closeMenu}>
                        Home
                    </MobileNavLink>
                </li>
                
                {isLoggedIn ? (
                    <>
                        <li>
                            <MobileNavLink href="/dashboard" onClick={closeMenu}>
                                Dashboard
                            </MobileNavLink>
                        </li>
                        <li>
                            <LogoutButton />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <MobileNavLink href="/registration" onClick={closeMenu}>
                                Registration
                            </MobileNavLink>
                        </li>
                        <li>
                            <MobileNavLink href="/login" onClick={closeMenu}>
                                Login
                            </MobileNavLink>
                        </li>
                    </>
                )}
                
                <li>
                    <MobileNavLink href="/contact" onClick={closeMenu}>
                        Contact
                    </MobileNavLink>
                </li>
                <li>
                    <button 
                        onClick={closeMenu}
                        className="cursor-pointer active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-purple-600 hover:bg-purple-700 transition text-white rounded-md flex"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </li>
            </ul>
        </div>
    );
}
