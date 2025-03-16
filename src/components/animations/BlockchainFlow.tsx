'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, DocumentTextIcon, LockClosedIcon, UsersIcon } from '@heroicons/react/24/outline';

export const BlockchainFlow = () => {
    const flowItems = [
        {
            icon: BriefcaseIcon,
            label: 'Digital Assets',
            description: 'Secure storage of your digital wealth',
            delay: 0,
        },
        {
            icon: DocumentTextIcon,
            label: 'Smart Contract',
            description: 'Automated transfer protocols',
            delay: 0.2,
        },
        {
            icon: LockClosedIcon,
            label: 'Blockchain',
            description: 'Immutable transaction records',
            delay: 0.4,
        },
        {
            icon: UsersIcon,
            label: 'Beneficiaries',
            description: 'Designated asset recipients',
            delay: 0.6,
        },
    ];

    return (
        <div className="relative">
            {/* Flow Items */}
            <div className="relative grid grid-cols-4 gap-8">
                {flowItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: item.delay }}
                    >
                        <motion.div
                            className="relative p-4 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <item.icon className="h-6 w-6 text-white" />
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white/5"
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: item.delay,
                                }}
                            />
                        </motion.div>
                        <motion.p
                            className="mt-3 text-sm font-medium text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: item.delay + 0.3 }}
                        >
                            {item.label}
                        </motion.p>
                        <motion.p
                            className="mt-1 text-xs text-zinc-400 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: item.delay + 0.4 }}
                        >
                            {item.description}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}; 