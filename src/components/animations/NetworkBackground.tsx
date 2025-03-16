'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const NetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size with device pixel ratio for sharper rendering
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        class Node {
            x: number;
            y: number;
            radius: number;
            speedX: number;
            speedY: number;
            connections: Node[];
            pulseRadius: number;
            pulseOpacity: number;
            type: 'asset' | 'transfer' | 'security';
            glowSize: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 4 + 3; // Larger nodes
                this.speedX = (Math.random() - 0.5) * 0.15;
                this.speedY = (Math.random() - 0.5) * 0.15;
                this.connections = [];
                this.pulseRadius = 0;
                this.pulseOpacity = 1;
                this.type = ['asset', 'transfer', 'security'][Math.floor(Math.random() * 3)] as 'asset' | 'transfer' | 'security';
                this.glowSize = this.radius * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (canvas && (this.x < 0 || this.x > canvas.width)) this.speedX *= -1;
                if (canvas && (this.y < 0 || this.y > canvas.height)) this.speedY *= -1;

                if (Math.random() < 0.003) {
                    this.pulseRadius = this.radius;
                    this.pulseOpacity = 1;
                }
                if (this.pulseRadius > 0) {
                    this.pulseRadius += 0.2;
                    this.pulseOpacity -= 0.008;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                const colors = {
                    asset: { main: '#60A5FA', glow: 'rgba(96, 165, 250, 0.5)' },
                    transfer: { main: '#34D399', glow: 'rgba(52, 211, 153, 0.5)' },
                    security: { main: '#F472B6', glow: 'rgba(244, 114, 182, 0.5)' }
                };

                const color = colors[this.type];

                // Draw glow effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.glowSize
                );
                gradient.addColorStop(0, color.glow);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw node
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = color.main;
                ctx.fill();

                // Draw pulse
                if (this.pulseRadius > 0 && this.pulseOpacity > 0) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${this.pulseOpacity * 0.8})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Draw connections
                this.connections.forEach(node => {
                    const distance = Math.hypot(node.x - this.x, node.y - this.y);
                    if (distance < 250) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(node.x, node.y);

                        // Create gradient for connection lines
                        const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
                        gradient.addColorStop(0, `rgba(255, 255, 255, ${(1 - distance / 250) * 0.4})`);
                        gradient.addColorStop(1, `rgba(255, 255, 255, ${(1 - distance / 250) * 0.1})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                });
            }
        }

        // Create more nodes
        const nodes: Node[] = [];
        const nodeCount = Math.floor((canvas.width * canvas.height) / 15000); // More nodes

        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        // More connections per node
        nodes.forEach(node => {
            const connections = nodes
                .filter(n => n !== node)
                .sort(() => Math.random() - 0.5)
                .slice(0, 5);
            node.connections = connections;
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes.forEach(node => {
                node.update();
                node.draw(ctx);
            });
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{
                mixBlendMode: 'screen',
                opacity: 0.8
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5 }}
        />
    );
}; 