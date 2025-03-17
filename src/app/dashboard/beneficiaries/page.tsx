'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    UserGroupIcon,
    PlusIcon,
    KeyIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

interface Beneficiary {
    id: string;
    name: string;
    address: string;
    email: string;
    sharedKeys: string[];
    createdAt: Date;
}

export default function Beneficiaries() {
    const { address, isConnected } = useAccount();
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
    });

    // Add new beneficiary
    const handleAddBeneficiary = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected) {
            alert('Please connect your wallet first');
            return;
        }

        setIsAdding(true);
        try {
            // Validate Ethereum address
            if (!ethers.isAddress(formData.address)) {
                throw new Error('Invalid Ethereum address');
            }

            const newBeneficiary: Beneficiary = {
                id: ethers.id(Date.now().toString()),
                name: formData.name,
                address: formData.address,
                email: formData.email,
                sharedKeys: [],
                createdAt: new Date(),
            };

            // Store beneficiary in smart contract
            await storeBeneficiaryData(newBeneficiary);

            setBeneficiaries(prev => [...prev, newBeneficiary]);
            setFormData({ name: '', address: '', email: '' });
            setIsAdding(false);
        } catch (error) {
            console.error('Error adding beneficiary:', error);
            alert(error instanceof Error ? error.message : 'Error adding beneficiary');
        } finally {
            setIsAdding(false);
        }
    };

    // Share keys with beneficiary using secure key sharing
    const handleShareKeys = async (beneficiaryId: string) => {
        try {
            const beneficiary = beneficiaries.find(b => b.id === beneficiaryId);
            if (!beneficiary) return;

            // Generate a new shared secret for the beneficiary
            const sharedSecret = ethers.randomBytes(32);

            // Encrypt the shared secret with beneficiary's public key
            const encryptedSecret = await encryptForBeneficiary(sharedSecret, beneficiary.address);

            // Store the encrypted secret in a secure way
            await storeEncryptedSecret(beneficiaryId, encryptedSecret);

            // Update beneficiary's shared keys
            setBeneficiaries(prev =>
                prev.map(b =>
                    b.id === beneficiaryId
                        ? { ...b, sharedKeys: [...b.sharedKeys, ethers.hexlify(sharedSecret)] }
                        : b
                )
            );

        } catch (error) {
            console.error('Error sharing keys:', error);
            alert('Error sharing keys. Please try again.');
        }
    };

    // Encrypt data for a specific beneficiary
    const encryptForBeneficiary = async (data: Uint8Array, beneficiaryAddress: string): Promise<string> => {
        // TODO: Implement proper encryption using beneficiary's public key
        // This is a placeholder for demonstration
        return ethers.hexlify(data);
    };

    // Store encrypted secret securely
    const storeEncryptedSecret = async (beneficiaryId: string, encryptedSecret: string) => {
        // TODO: Implement secure storage of encrypted secrets
        console.log('Storing encrypted secret for beneficiary:', beneficiaryId);
    };

    // Store beneficiary data in smart contract
    const storeBeneficiaryData = async (beneficiary: Beneficiary) => {
        // TODO: Implement smart contract interaction
        console.log('Storing beneficiary data:', beneficiary);
    };

    // Remove beneficiary
    const handleRemove = async (id: string) => {
        // TODO: Implement beneficiary removal from smart contract
        setBeneficiaries(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Beneficiaries</h1>
            </div>

            {/* Add Beneficiary Form */}
            <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                <form onSubmit={handleAddBeneficiary} className="space-y-4">
                    <h2 className="text-lg font-medium text-white">Add New Beneficiary</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Ethereum Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                required
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                                placeholder="0x..."
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-zinc-400">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                required
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isAdding || !isConnected}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        {isAdding ? 'Adding...' : 'Add Beneficiary'}
                    </button>
                </form>
            </MagicContainer>

            {/* Beneficiaries List */}
            <div className="space-y-4">
                {beneficiaries.map((beneficiary) => (
                    <motion.div
                        key={beneficiary.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-zinc-900/50 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <UserGroupIcon className="h-6 w-6 text-blue-400" />
                                <div>
                                    <h3 className="text-white font-medium">{beneficiary.name}</h3>
                                    <p className="text-sm text-zinc-400">{beneficiary.email}</p>
                                    <p className="text-xs text-zinc-500">{beneficiary.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleShareKeys(beneficiary.id)}
                                    className="flex items-center text-blue-400 hover:text-blue-500"
                                >
                                    <KeyIcon className="h-5 w-5 mr-1" />
                                    Share Keys
                                </button>
                                <button
                                    onClick={() => handleRemove(beneficiary.id)}
                                    className="text-red-400 hover:text-red-500"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        {beneficiary.sharedKeys.length > 0 && (
                            <div className="mt-4 text-sm text-zinc-400">
                                <p>Shared Keys: {beneficiary.sharedKeys.length}</p>
                                <p>Last Updated: {beneficiary.createdAt.toLocaleDateString()}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 