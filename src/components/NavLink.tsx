'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function NavLink({ href, children, className = "", onClick }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

    return (
        <Link 
            href={href} 
            className={`relative ${className} ${isActive ? 'font-semibold' : ''}`}
            onClick={onClick}
        >
            {children}
            {isActive && (
                <span 
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                    style={{ color: 'oklch(70% 0.22 303.9)' }}
                >
                    <svg 
                        width="14" 
                        height="10" 
                        viewBox="0 0 14 10" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    >
                        <path 
                            d="M7 10L0 0H14L7 10Z" 
                            fill="currentColor"
                        />
                    </svg>
                </span>
            )}
        </Link>
    );
}

