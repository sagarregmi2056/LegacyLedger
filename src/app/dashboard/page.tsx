'use client';

import { motion } from 'framer-motion';
import {
    WalletIcon,
    DocumentDuplicateIcon,
    UserGroupIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';

const stats = [
    { name: 'Total Assets', value: '12', icon: WalletIcon },
    { name: 'Documents', value: '24', icon: DocumentDuplicateIcon },
    { name: 'Beneficiaries', value: '3', icon: UserGroupIcon },
];

const recentActivity = [
    {
        id: 1,
        type: 'Asset Added',
        description: 'Added Bitcoin Wallet',
        date: '2 hours ago',
    },
    {
        id: 2,
        type: 'Document Updated',
        description: 'Updated Last Will',
        date: '5 hours ago',
    },
    {
        id: 3,
        type: 'Beneficiary Added',
        description: 'Added John Doe',
        date: '1 day ago',
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
                <span className="text-sm text-zinc-400">Last updated: Just now</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <MagicContainer className="relative overflow-hidden rounded-lg bg-zinc-900/50 p-6">
                            <dt>
                                <div className="absolute rounded-md bg-blue-500/10 p-3">
                                    <stat.icon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-zinc-400">
                                    {stat.name}
                                </p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                            </dd>
                        </MagicContainer>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                    <h2 className="text-lg font-medium text-white mb-6">Recent Activity</h2>
                    <div className="flow-root">
                        <ul role="list" className="-mb-8">
                            {recentActivity.map((activity, activityIdx) => (
                                <motion.li
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: activityIdx * 0.1 }}
                                >
                                    <div className="relative pb-8">
                                        {activityIdx !== recentActivity.length - 1 ? (
                                            <span
                                                className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-zinc-800"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
                                                    <ClockIcon className="h-4 w-4 text-blue-400" />
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                                <div>
                                                    <p className="text-sm text-white">{activity.description}</p>
                                                    <p className="text-sm text-zinc-400">{activity.type}</p>
                                                </div>
                                                <div className="whitespace-nowrap text-right text-sm text-zinc-400">
                                                    {activity.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </MagicContainer>

                {/* Quick Actions */}
                <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                    <h2 className="text-lg font-medium text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center rounded-md bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors">
                            <WalletIcon className="h-5 w-5 mr-2" />
                            Add Asset
                        </button>
                        <button className="flex items-center justify-center rounded-md bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors">
                            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                            Upload Document
                        </button>
                        <button className="flex items-center justify-center rounded-md bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors">
                            <UserGroupIcon className="h-5 w-5 mr-2" />
                            Add Beneficiary
                        </button>
                    </div>
                </MagicContainer>
            </div>
        </div>
    );
} 