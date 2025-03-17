'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    DocumentIcon,
    PhotoIcon,
    MusicalNoteIcon,
    VideoCameraIcon,
    ArrowUpTrayIcon,
    LockClosedIcon,
    TrashIcon,
    CloudIcon,
} from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

interface Asset {
    id: string;
    name: string;
    type: 'document' | 'image' | 'audio' | 'video' | 'other';
    s3Key: string;
    encryptionKey: string;
    createdAt: Date;
    size: number;
    mimeType: string;
    metadata?: {
        description?: string;
        tags?: string[];
        thumbnail?: string;
    };
}

const ACCEPTED_FILE_TYPES: Record<Asset['type'], string> = {
    document: '.pdf,.doc,.docx,.txt,.rtf',
    image: '.jpg,.jpeg,.png,.gif,.webp',
    audio: '.mp3,.wav,.ogg,.m4a',
    video: '.mp4,.webm,.mov',
    other: '*',
};

export default function Assets() {
    const { address, isConnected } = useAccount();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedType, setSelectedType] = useState<Asset['type']>('document');
    const [metadata, setMetadata] = useState({ description: '', tags: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getIconForType = (type: Asset['type']) => {
        switch (type) {
            case 'document': return DocumentIcon;
            case 'image': return PhotoIcon;
            case 'audio': return MusicalNoteIcon;
            case 'video': return VideoCameraIcon;
            default: return DocumentIcon;
        }
    };

    // Handle file selection and upload
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        if (!isConnected) {
            alert('Please connect your wallet first');
            return;
        }

        const file = event.target.files[0];
        setIsUploading(true);

        try {
            // Generate encryption key
            const encryptionKey = ethers.randomBytes(32);

            // Encrypt the file
            const encryptedData = await encryptFile(file, encryptionKey);

            // Upload to S3
            const s3Key = await uploadToS3(encryptedData, file.name);

            const newAsset: Asset = {
                id: ethers.id(Date.now().toString()),
                name: file.name,
                type: selectedType,
                s3Key,
                encryptionKey: ethers.hexlify(encryptionKey),
                createdAt: new Date(),
                size: file.size,
                mimeType: file.type,
                metadata: {
                    description: metadata.description,
                    tags: metadata.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                },
            };

            // Store asset metadata in smart contract
            await storeAssetMetadata(newAsset);

            setAssets(prev => [...prev, newAsset]);
            setMetadata({ description: '', tags: '' });

        } catch (error) {
            console.error('Error uploading asset:', error);
            alert('Error uploading asset. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Encrypt file
    const encryptFile = async (file: File, key: Uint8Array): Promise<ArrayBuffer> => {
        const arrayBuffer = await file.arrayBuffer();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        // Convert encryption key to CryptoKey
        const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            key,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );

        // Encrypt the file
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv,
            },
            cryptoKey,
            arrayBuffer
        );

        // Combine IV and encrypted data
        const combined = new Uint8Array(iv.length + encryptedData.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encryptedData), iv.length);

        return combined.buffer;
    };

    // Upload to S3
    const uploadToS3 = async (data: ArrayBuffer, filename: string): Promise<string> => {
        try {
            const response = await fetch('/api/s3/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to upload to S3');
            }

            const { key } = await response.json();
            return key;
        } catch (error) {
            console.error('S3 upload error:', error);
            throw error;
        }
    };

    // Store asset metadata in smart contract
    const storeAssetMetadata = async (asset: Asset) => {
        // TODO: Implement smart contract interaction
        console.log('Storing asset metadata:', asset);
    };

    // Delete asset
    const handleDelete = async (id: string) => {
        try {
            const asset = assets.find(a => a.id === id);
            if (!asset) return;

            // Delete from S3
            await fetch(`/api/s3/delete?key=${asset.s3Key}`, {
                method: 'DELETE',
            });

            // Remove from smart contract
            // TODO: Implement smart contract interaction

            setAssets(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting asset:', error);
            alert('Error deleting asset. Please try again.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Digital Assets</h1>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept={ACCEPTED_FILE_TYPES[selectedType]}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || !isConnected}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Asset'}
                    </button>
                </div>
            </div>

            {/* Upload Form */}
            <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-white">Upload New Asset</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Asset Type</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as Asset['type'])}
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                            >
                                <option value="document">Document</option>
                                <option value="image">Image</option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400">Tags</label>
                            <input
                                type="text"
                                value={metadata.tags}
                                onChange={(e) => setMetadata(prev => ({ ...prev, tags: e.target.value }))}
                                placeholder="Enter tags, separated by commas"
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-zinc-400">Description</label>
                            <textarea
                                value={metadata.description}
                                onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter asset description"
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </MagicContainer>

            {/* Assets List */}
            <div className="space-y-4">
                {assets.map((asset) => (
                    <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-zinc-900/50 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                {React.createElement(getIconForType(asset.type), {
                                    className: "h-6 w-6 text-blue-400"
                                })}
                                <div>
                                    <h3 className="text-white font-medium">{asset.name}</h3>
                                    <p className="text-sm text-zinc-400">
                                        {(asset.size / 1024).toFixed(2)} KB • {asset.mimeType}
                                    </p>
                                    {asset.metadata?.tags && asset.metadata.tags.length > 0 && (
                                        <div className="flex gap-2 mt-1">
                                            {asset.metadata.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center text-green-400 text-sm">
                                    <CloudIcon className="h-4 w-4 mr-1" />
                                    S3
                                </span>
                                <span className="flex items-center text-green-400 text-sm">
                                    <LockClosedIcon className="h-4 w-4 mr-1" />
                                    Encrypted
                                </span>
                                <button
                                    onClick={() => handleDelete(asset.id)}
                                    className="text-red-400 hover:text-red-500"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        {asset.metadata?.description && (
                            <p className="mt-2 text-sm text-zinc-400">
                                {asset.metadata.description}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 