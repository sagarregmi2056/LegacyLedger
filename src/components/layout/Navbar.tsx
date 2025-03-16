'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { ConnectWallet } from '../ConnectWallet';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-zinc-800' : 'bg-transparent'
                }`}
        >
            <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center gap-x-2">
                            <span className="text-xl font-semibold text-white">Legacy Ledger</span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} {...link} />
                        ))}
                    </div>

                    <div className="flex flex-1 justify-end items-center gap-x-6">
                        {session ? (
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-white hover:text-zinc-300 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-white hover:text-zinc-300 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="rounded-full px-4 py-1.5 text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                        <ConnectWallet />
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}

function NavLink({ name, href }: { name: string; href: string }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
        >
            {name}
        </Link>
    );
}

const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]; 