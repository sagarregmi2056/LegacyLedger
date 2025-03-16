'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    GlobeAltIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    KeyIcon,
    UserGroupIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    ChatBubbleLeftIcon,
    BuildingOfficeIcon,
    NewspaperIcon,
    BriefcaseIcon,
    MegaphoneIcon,
    LockClosedIcon,
    DocumentIcon,
    ShieldExclamationIcon,
    FingerPrintIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black border-t border-zinc-800"
        >
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="text-xl font-semibold text-white">
                            Legacy Ledger
                        </Link>
                        <p className="text-sm leading-6 text-zinc-400">
                            Securing your digital legacy through innovative blockchain technology.
                        </p>
                        <div className="flex space-x-6">
                            {socialLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-5 w-5" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <GlobeAltIcon className="h-4 w-4" />
                                    Solutions
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {solutions.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <QuestionMarkCircleIcon className="h-4 w-4" />
                                    Support
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {support.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <BuildingOfficeIcon className="h-4 w-4" />
                                    Company
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {company.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <ShieldCheckIcon className="h-4 w-4" />
                                    Legal
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {legal.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-zinc-800">
                    <p className="text-xs text-zinc-400 xl:text-center">
                        &copy; {new Date().getFullYear()} Legacy Ledger. All rights reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}

const solutions = [
    { name: 'Digital Asset Management', href: '/solutions/asset-management', icon: DocumentTextIcon },
    { name: 'Smart Contracts', href: '/solutions/smart-contracts', icon: KeyIcon },
    { name: 'Legacy Planning', href: '/solutions/legacy-planning', icon: ShieldCheckIcon },
    { name: 'Secure Storage', href: '/solutions/secure-storage', icon: LockClosedIcon },
];

const support = [
    { name: 'Documentation', href: '/docs', icon: BookOpenIcon },
    { name: 'Guides', href: '/guides', icon: DocumentIcon },
    { name: 'FAQs', href: '/faqs', icon: QuestionMarkCircleIcon },
    { name: 'Contact', href: '/contact', icon: ChatBubbleLeftIcon },
];

const company = [
    { name: 'About', href: '/about', icon: BuildingOfficeIcon },
    { name: 'Blog', href: '/blog', icon: NewspaperIcon },
    { name: 'Careers', href: '/careers', icon: BriefcaseIcon },
    { name: 'Press', href: '/press', icon: MegaphoneIcon },
];

const legal = [
    { name: 'Privacy', href: '/privacy', icon: ShieldCheckIcon },
    { name: 'Terms', href: '/terms', icon: DocumentTextIcon },
    { name: 'Security', href: '/security', icon: ShieldExclamationIcon },
    { name: 'Cookies', href: '/cookies', icon: FingerPrintIcon },
];

const socialLinks = [
    {
        name: 'Twitter',
        href: '#',
        icon: (props: any) => (
            <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
                <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        href: '#',
        icon: (props: any) => (
            <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: (props: any) => (
            <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
                <path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
        ),
    },
]; 