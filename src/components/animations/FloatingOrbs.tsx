'use client';

import { motion } from 'framer-motion';

interface FloatingOrbsProps {
    className?: string;
}

export const FloatingOrbs = ({ className = '' }: FloatingOrbsProps) => {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <motion.div
                className="absolute w-[500px] h-[500px] left-[10%] top-[20%] rounded-full bg-purple-700/30 mix-blend-multiply filter blur-xl"
                animate={{
                    y: [0, -50, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute w-[600px] h-[600px] right-[5%] top-[10%] rounded-full bg-blue-700/30 mix-blend-multiply filter blur-xl"
                animate={{
                    y: [0, 50, 0],
                    x: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] left-[40%] bottom-[20%] rounded-full bg-indigo-700/30 mix-blend-multiply filter blur-xl"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
            />
        </div>
    );
}; 