'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    DocumentIcon,
    ArrowUpTrayIcon,
    LockClosedIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { MagicContainer } from '@/components/animations/MagicContainer';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

interface Document {
    id: string;
    name: string;
    hash: string;
    encryptionKey: string;
    createdAt: Date;
    size: number;
    type: string;
}

export default function Documents() {
    const { address, isConnected } = useAccount();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            // Generate a random encryption key
            const encryptionKey = ethers.randomBytes(32);

            // Encrypt the file
            const encryptedData = await encryptFile(file, encryptionKey);

            // Upload to IPFS
            const ipfsHash = await uploadToIPFS(encryptedData);

            const newDocument: Document = {
                id: ethers.id(Date.now().toString()),
                name: file.name,
                hash: ipfsHash,
                encryptionKey: ethers.hexlify(encryptionKey),
                createdAt: new Date(),
                size: file.size,
                type: file.type,
            };

            setDocuments(prev => [...prev, newDocument]);

            // Store document metadata in smart contract
            await storeDocumentMetadata(newDocument);

        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Error uploading document. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Encrypt file using the generated key
    const encryptFile = async (file: File, key: Uint8Array): Promise<ArrayBuffer> => {
        // TODO: Implement proper file encryption
        // This is a placeholder for demonstration
        const arrayBuffer = await file.arrayBuffer();
        return arrayBuffer;
    };

    // Upload encrypted file to IPFS
    const uploadToIPFS = async (data: ArrayBuffer): Promise<string> => {
        // TODO: Implement IPFS upload
        // This is a placeholder for demonstration
        return 'QmHash...';
    };

    // Store document metadata in smart contract
    const storeDocumentMetadata = async (document: Document) => {
        // TODO: Implement smart contract interaction
        console.log('Storing document metadata:', document);
    };

    // Delete document
    const handleDelete = async (id: string) => {
        // TODO: Implement document deletion
        setDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Secure Documents</h1>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || !isConnected}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                </div>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
                {documents.map((doc) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-zinc-900/50 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <DocumentIcon className="h-6 w-6 text-blue-400" />
                                <div>
                                    <h3 className="text-white font-medium">{doc.name}</h3>
                                    <p className="text-sm text-zinc-400">
                                        {(doc.size / 1024).toFixed(2)} KB • {doc.type}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center text-green-400 text-sm">
                                    <LockClosedIcon className="h-4 w-4 mr-1" />
                                    Encrypted
                                </span>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    className="text-red-400 hover:text-red-500"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-zinc-400">
                            <p>IPFS Hash: {doc.hash}</p>
                            <p>Uploaded: {doc.createdAt.toLocaleDateString()}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 