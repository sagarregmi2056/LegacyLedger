'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface GradientButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const GradientButton = ({
    href,
    children,
    className = '',
    size = 'md'
}: GradientButtonProps) => {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg'
    };

    return (
        <Link
            href={href}
            className={`group relative rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] overflow-hidden ${className}`}
        >
            <motion.span
                className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 backdrop-blur-3xl hover:bg-slate-950/70 transition-all duration-200 ${sizeClasses[size]} font-medium text-white`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {children}
            </motion.span>
        </Link>
    );
}; 