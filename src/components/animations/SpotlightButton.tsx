'use client';

import { motion } from 'framer-motion';
import { useState, type MouseEvent } from 'react';

export interface SpotlightButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function SpotlightButton({
    children,
    variant = 'primary',
    className = '',
    onClick,
}: SpotlightButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const baseStyles = `relative overflow-hidden rounded-lg px-8 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-100 ${className}`;
    const variantStyles = {
        primary: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20',
        secondary: 'bg-zinc-900 text-white hover:bg-zinc-800',
    };

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles[variant]}`}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: variant === 'primary'
                        ? `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`
                        : `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.1), transparent 40%)`,
                }}
            />
            {children}
        </motion.button>
    );
} 