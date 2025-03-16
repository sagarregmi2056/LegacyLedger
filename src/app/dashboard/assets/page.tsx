'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CloudArrowUpIcon,
    DocumentIcon,
    PhotoIcon,
    MusicalNoteIcon,
    VideoCameraIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';

interface Asset {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
    url: string;
}

const assetTypeIcons = {
    document: DocumentIcon,
    image: PhotoIcon,
    audio: MusicalNoteIcon,
    video: VideoCameraIcon,
};

export default function DigitalAssets() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Get presigned URL from your API
            const response = await fetch('/api/assets/upload-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                }),
            });

            const { url, fields } = await response.json();

            // Create form data with the file and additional fields
            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            formData.append('file', file);

            // Upload to S3
            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                // Add the new asset to the list
                const newAsset: Asset = {
                    id: Date.now().toString(),
                    name: file.name,
                    type: file.type.split('/')[0],
                    size: formatFileSize(file.size),
                    uploadedAt: new Date().toLocaleString(),
                    url: `${url}/${fields.key}`,
                };

                setAssets((prev) => [...prev, newAsset]);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (assetId: string) => {
        try {
            await fetch(`/api/assets/${assetId}`, {
                method: 'DELETE',
            });
            setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Digital Assets</h1>
            </div>

            {/* Upload Section */}
            <MagicContainer className="rounded-lg bg-zinc-900/50 p-6">
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer hover:border-blue-500/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <CloudArrowUpIcon className="w-12 h-12 text-zinc-400 mb-4" />
                            <p className="mb-2 text-sm text-zinc-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-zinc-500">
                                Any file type up to 50MB
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                        />
                    </label>
                </div>

                {isUploading && (
                    <div className="mt-4">
                        <div className="w-full bg-zinc-800 rounded-full h-2.5">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </MagicContainer>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {assets.map((asset, index) => {
                    const Icon = assetTypeIcons[asset.type as keyof typeof assetTypeIcons] || DocumentIcon;

                    return (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <MagicContainer className="relative group rounded-lg bg-zinc-900/50 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Icon className="h-8 w-8 text-blue-400" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-sm font-medium text-white truncate max-w-[200px]">
                                                {asset.name}
                                            </h3>
                                            <p className="text-sm text-zinc-400">{asset.size}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(asset.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-full"
                                    >
                                        <TrashIcon className="h-5 w-5 text-red-400" />
                                    </button>
                                </div>
                                <div className="mt-4 text-xs text-zinc-500">
                                    Uploaded {asset.uploadedAt}
                                </div>
                            </MagicContainer>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 