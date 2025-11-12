'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MobileNavLink({ href, children, className = "", onClick }: MobileNavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

    return (
        <Link 
            href={href} 
            className={`relative px-6 py-3 transition-all duration-200 ${className} ${
                isActive 
                    ? 'bg-white/20 text-white font-semibold shadow-lg' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            onClick={onClick}
        >
            {children}
            {isActive && (
                <span 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{ backgroundColor: 'oklch(70% 0.22 303.9)' }}
                ></span>
            )}
        </Link>
    );
}

