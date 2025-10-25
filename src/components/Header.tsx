/**
 * Header component
 */
'use client';
import Link from "next/link";

export default function Header() {
    // Menu visibility is handled via CSS hover (group + group-hover)

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
                        <li>
                            <Link href="/packages" className="hover:underline">
                                Packages
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="relative md:hidden group">
                    <button id="mobile-menu-button" className="md:hidden" aria-haspopup="true">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>                   

                    <div id="mobile-menu" className="w-[150] hidden group-hover:block md:hidden absolute top-6 right-0 bg-purple-400">
                        <ul className="block space-x-4 text-right">
                            <li>
                                <Link href="/" className="">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/packages" className="">
                                    Packages
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}