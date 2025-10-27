'use client';
import { logout } from "@/lib/login";

export default function LogoutButton() {
    const handleLogout = async () => {
        const result = await logout();
        if (result?.success) {
            window.location.href = result.redirectTo;
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="hover:underline cursor-pointer"
        >
            Logout
        </button>
    );
}
