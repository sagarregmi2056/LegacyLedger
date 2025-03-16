'use client';

import { motion } from 'framer-motion';

interface GridBackgroundProps {
    className?: string;
}

export const GridBackground = ({ className = '' }: GridBackgroundProps) => {
    return (
        <motion.div
            className={`absolute inset-0 ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black" />
        </motion.div>
    );
}; 