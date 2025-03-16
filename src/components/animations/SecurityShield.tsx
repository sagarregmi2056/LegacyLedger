'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

interface SecurityShieldProps {
    className?: string;
}

export const SecurityShield = ({ className = '' }: SecurityShieldProps) => {
    return (
        <div className={`relative flex flex-col items-center ${className}`}>
            {/* Background Glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            {/* Shield Container */}
            <motion.div
                className="relative flex items-center justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Rotating Circles */}
                <motion.div
                    className="absolute w-64 h-64"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-white/10"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 45}deg) translateY(-32px)`,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Pulsing Shield */}
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur-xl"
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.1, 0.8] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="relative w-32 h-32 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ShieldCheckIcon className="w-16 h-16 text-white" />
                    </motion.div>
                </motion.div>

                {/* Orbiting Particles */}
                <motion.div
                    className="absolute w-full h-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-white/20"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 120}deg) translateY(-48px)`,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                delay: i * 0.6,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Description Text */}
            <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h3 className="text-xl font-semibold text-white">
                    Military-Grade Security
                </h3>
                <p className="text-sm text-zinc-400 max-w-md">
                    Your digital assets are protected with state-of-the-art encryption and blockchain technology, ensuring maximum security and peace of mind.
                </p>
            </motion.div>
        </div>
    );
}; 