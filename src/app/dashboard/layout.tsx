'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    WalletIcon,
    DocumentDuplicateIcon,
    KeyIcon,
    UserGroupIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'Digital Assets', href: '/dashboard/assets', icon: WalletIcon },
    { name: 'Documents', href: '/dashboard/documents', icon: DocumentDuplicateIcon },
    { name: 'Access Keys', href: '/dashboard/keys', icon: KeyIcon },
    { name: 'Beneficiaries', href: '/dashboard/beneficiaries', icon: UserGroupIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-black">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: isSidebarOpen ? 0 : -280 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800"
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar header */}
                    <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
                        <Link href="/dashboard" className="flex items-center space-x-3">
                            <span className="text-xl font-bold text-white">Legacy Ledger</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                            ? 'bg-blue-500/10 text-blue-400'
                                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-zinc-400'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout button */}
                    <div className="border-t border-zinc-800 p-4">
                        <button
                            onClick={() => {/* Add logout logic */ }}
                            className="group flex w-full items-center px-2 py-2 text-sm font-medium text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-white"
                        >
                            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                            Sign out
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main content */}
            <main
                className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'
                    }`}
            >
                <div className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
} 