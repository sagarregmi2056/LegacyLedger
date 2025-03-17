'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheckIcon,
    KeyIcon,
    BellIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';
import { useAccount } from 'wagmi';

interface SecuritySettings {
    twoFactorEnabled: boolean;
    emailNotifications: boolean;
    autoLockTimeout: number;
    recoveryEmailSet: boolean;
}

export default function Settings() {
    const { address, isConnected } = useAccount();
    const [settings, setSettings] = useState<SecuritySettings>({
        twoFactorEnabled: false,
        emailNotifications: true,
        autoLockTimeout: 15,
        recoveryEmailSet: false,
    });
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Handle settings changes
    const handleSettingChange = async (setting: keyof SecuritySettings, value: boolean | number) => {
        if (!isConnected) {
            alert('Please connect your wallet first');
            return;
        }

        setIsSaving(true);
        try {
            // Update settings in smart contract or secure storage
            await updateSecuritySettings({ ...settings, [setting]: value });

            setSettings(prev => ({ ...prev, [setting]: value }));
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Error updating settings. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle recovery email update
    const handleRecoveryEmailUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected) {
            alert('Please connect your wallet first');
            return;
        }

        setIsSaving(true);
        try {
            // Store recovery email securely
            await updateRecoveryEmail(recoveryEmail);

            setSettings(prev => ({ ...prev, recoveryEmailSet: true }));
            alert('Recovery email updated successfully');
        } catch (error) {
            console.error('Error updating recovery email:', error);
            alert('Error updating recovery email. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Update security settings in smart contract or secure storage
    const updateSecuritySettings = async (newSettings: SecuritySettings) => {
        // TODO: Implement settings update in smart contract
        console.log('Updating security settings:', newSettings);
    };

    // Update recovery email
    const updateRecoveryEmail = async (email: string) => {
        // TODO: Implement recovery email update
        console.log('Updating recovery email:', email);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Security Settings</h1>
            </div>

            {/* Security Settings */}
            <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                <h2 className="text-lg font-medium text-white mb-6">Security Configuration</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
                            <div>
                                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                                <p className="text-sm text-zinc-400">Add an extra layer of security</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.twoFactorEnabled}
                                onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <BellIcon className="h-6 w-6 text-blue-400" />
                            <div>
                                <h3 className="text-white font-medium">Email Notifications</h3>
                                <p className="text-sm text-zinc-400">Get notified about important events</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <KeyIcon className="h-6 w-6 text-blue-400" />
                            <div>
                                <h3 className="text-white font-medium">Auto-Lock Timeout</h3>
                                <p className="text-sm text-zinc-400">Minutes until automatic logout</p>
                            </div>
                        </div>
                        <select
                            value={settings.autoLockTimeout}
                            onChange={(e) => handleSettingChange('autoLockTimeout', parseInt(e.target.value))}
                            className="bg-zinc-800 border-zinc-700 text-white rounded-md"
                        >
                            <option value={5}>5 minutes</option>
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                        </select>
                    </div>
                </div>
            </MagicContainer>

            {/* Recovery Email */}
            <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                <h2 className="text-lg font-medium text-white mb-6">Recovery Settings</h2>
                <form onSubmit={handleRecoveryEmailUpdate} className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="h-6 w-6 text-blue-400" />
                        <div>
                            <h3 className="text-white font-medium">Recovery Email</h3>
                            <p className="text-sm text-zinc-400">Used for account recovery</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="email"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            placeholder="recovery@example.com"
                            className="flex-1 rounded-md bg-zinc-800 border-zinc-700 text-white"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSaving || !isConnected}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isSaving ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </MagicContainer>
        </div>
    );
} 