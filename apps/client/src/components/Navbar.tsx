"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Debug log
    console.log("Navbar render:", { isLoaded, isSignedIn, mounted });

    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
            {/* LEFT */}
            <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="TrendLama"
                    width={36}
                    height={36}
                    className="w-6 h-6 md:w-9 md:h-9"
                />
                <p className="hidden md:block text-md font-medium tracking-wider">
                    TRENDLAMA.
                </p>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href="/">
                    <Home className="w-4 h-4 text-gray-600" />
                </Link>
                <Bell className="w-4 h-4 text-gray-600" />
                <ShoppingCartIcon />

                {/* Simple auth buttons - always show something */}
                <div>
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton mode="modal">
                            <span className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                                Sign In
                            </span>
                        </SignInButton>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;