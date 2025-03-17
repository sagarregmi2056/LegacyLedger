'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KeyIcon, ArrowDownTrayIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

interface KeyPair {
    id: string;
    publicKey: string;
    encryptedPrivateKey: string;
    createdAt: Date;
    purpose: string;
}

export default function KeysManagement() {
    const { address, isConnected } = useAccount();
    const [keys, setKeys] = useState<KeyPair[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [purpose, setPurpose] = useState('');

    // Generate a new key pair with encryption
    const generateNewKeyPair = async () => {
        if (!isConnected) {
            alert('Please connect your wallet first');
            return;
        }

        setIsGenerating(true);
        try {
            // Generate a new random wallet
            const wallet = ethers.Wallet.createRandom();

            // Get the wallet's private key and public key
            const privateKey = wallet.privateKey;
            const publicKey = wallet.publicKey;

            // Encrypt the private key with the user's public key
            // In a real implementation, you'd want to use the user's public key from their wallet
            const encryptedPrivateKey = await encryptPrivateKey(privateKey, address!);

            const newKeyPair: KeyPair = {
                id: ethers.id(Date.now().toString()),
                publicKey,
                encryptedPrivateKey,
                createdAt: new Date(),
                purpose: purpose || 'General Purpose',
            };

            setKeys(prev => [...prev, newKeyPair]);
            setPurpose('');

            // Store encrypted key in a secure way (e.g., IPFS or secure storage)
            await storeEncryptedKey(newKeyPair);

        } catch (error) {
            console.error('Error generating key pair:', error);
            alert('Error generating key pair. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Encrypt private key using user's public key
    const encryptPrivateKey = async (privateKey: string, userAddress: string) => {
        // In a real implementation, you'd want to use proper encryption
        // This is a placeholder for demonstration
        return ethers.encryptKeystoreJson(
            { privateKey },
            userAddress // Using address as password for demo
        );
    };

    // Store encrypted key in secure storage
    const storeEncryptedKey = async (keyPair: KeyPair) => {
        // TODO: Implement secure storage (e.g., IPFS)
        console.log('Storing encrypted key:', keyPair);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Key Management</h1>
                <button
                    onClick={generateNewKeyPair}
                    disabled={isGenerating || !isConnected}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    {isGenerating ? 'Generating...' : 'Generate New Key'}
                </button>
            </div>

            {/* Key Generation Form */}
            <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-white">Generate New Key</h2>
                    <div>
                        <label className="block text-sm font-medium text-zinc-400">Purpose</label>
                        <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            placeholder="e.g., Document Encryption, Asset Protection"
                            className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>
                </div>
            </MagicContainer>

            {/* Keys List */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-white">Your Keys</h2>
                {keys.map((key) => (
                    <motion.div
                        key={key.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-zinc-900/50 p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <KeyIcon className="h-6 w-6 text-blue-400" />
                                <span className="text-white font-medium">{key.purpose}</span>
                            </div>
                            <span className="text-sm text-zinc-400">
                                {key.createdAt.toLocaleDateString()}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Public Key</span>
                                <code className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                                    {`${key.publicKey.slice(0, 20)}...${key.publicKey.slice(-8)}`}
                                </code>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Status</span>
                                <span className="flex items-center text-green-400">
                                    <LockClosedIcon className="h-4 w-4 mr-1" />
                                    Encrypted
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 