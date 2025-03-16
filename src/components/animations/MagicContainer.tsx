'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagicContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const MagicContainer = ({ children, className = '' }: MagicContainerProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 transition duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05), transparent 40%)`,
                }}
            />
            <div className="relative z-20">{children}</div>
        </motion.div>
    );
}; 