'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, KeyIcon, DocumentTextIcon, CheckIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FloatingOrbs } from '@/components/animations/FloatingOrbs';
import { GridBackground } from '@/components/animations/GridBackground';
import { BlockchainFlow } from '@/components/animations/BlockchainFlow';
import { SecurityShield } from '@/components/animations/SecurityShield';
import { MagicContainer } from '@/components/animations/MagicContainer';
import { SpotlightButton } from '@/components/animations/SpotlightButton';
import { LinkButton } from '@/components/animations/LinkButton';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={ref} className="min-h-screen bg-black overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative isolate min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-radial from-zinc-800/20 via-black to-black" />
        <GridBackground className="opacity-30" />

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 mx-auto max-w-7xl px-6 pt-32 sm:pt-40 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-8xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Secure Your
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-transparent bg-clip-text">Digital Legacy</span>
            </motion.h1>
            <motion.p
              className="mt-8 text-xl leading-8 text-zinc-300 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Legacy Ledger helps you manage and secure your digital assets using blockchain technology, ensuring your digital wealth reaches your loved ones securely.
            </motion.p>
            <div className="mt-8 flex gap-4">
              <LinkButton href="/auth/signup" variant="primary">
                Get Started
              </LinkButton>
              <LinkButton href="/about" variant="secondary">
                Learn more <span aria-hidden="true">→</span>
              </LinkButton>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="relative py-32 bg-zinc-900 border-t border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.span
              className="text-sm font-semibold text-blue-400 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Simple Process
            </motion.span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
              How Legacy Ledger Works
            </h2>
            <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto">
              Secure your digital legacy in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <MagicContainer className="h-full p-8 relative bg-black/50 backdrop-blur-sm">
                  <div className="flex flex-col items-start relative z-10">
                    <motion.div
                      className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6 group-hover:border-blue-500/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <step.icon className="h-7 w-7 text-blue-400" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-zinc-300 text-base leading-relaxed mb-6">
                      {step.description}
                    </p>
                    {step.features && (
                      <ul className="mt-auto space-y-3">
                        {step.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-zinc-300">
                            <CheckIcon className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </MagicContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Flow Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-32 overflow-hidden bg-black"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <MagicContainer className="p-12 bg-zinc-900/50">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Secure Transfer Process
              </h2>
              <p className="mt-6 text-xl text-zinc-300 font-light">
                Your digital assets are protected and transferred securely through our blockchain network
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <SecurityShield className="w-full h-[400px]" />
              </div>
              <BlockchainFlow />
            </div>
          </MagicContainer>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="relative py-32 bg-zinc-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">Secure by Design</h2>
            <p className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The Future of Digital Legacy
            </p>
          </motion.div>

          <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <MagicContainer key={feature.name} className="p-8 bg-black/50">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <dt className="text-lg font-semibold leading-7 text-white">
                      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <feature.icon className="h-8 w-8 text-blue-400" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                </MagicContainer>
              ))}
            </dl>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative isolate overflow-hidden bg-black"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <MagicContainer className="p-12 bg-zinc-900/50">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Ready to secure your digital legacy?
                <br />
                <span className="text-blue-400">Start protecting your assets today.</span>
              </h2>
              <div className="mt-12 flex items-center justify-center gap-x-8">
                <LinkButton href="/auth/signup" variant="primary">
                  Get started
                </LinkButton>
                <LinkButton href="/contact" variant="secondary">
                  Contact us <span aria-hidden="true">→</span>
                </LinkButton>
              </div>
            </div>
          </MagicContainer>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}

const features = [
  {
    name: 'Secure Asset Management',
    description: 'Store and manage your digital assets with military-grade encryption and blockchain verification, ensuring maximum security for your digital wealth.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Smart Access Control',
    description: 'Designate trusted executors and set up smart contracts that automatically handle asset transfers according to your specifications.',
    icon: KeyIcon,
  },
  {
    name: 'Digital Will Creation',
    description: 'Create and manage your digital will with our intuitive interface, ensuring your digital legacy is distributed exactly as you intend.',
    icon: DocumentTextIcon,
  },
];

const steps = [
  {
    title: "Set Up Your Digital Vault",
    description: "Create your secure vault and start adding your valuable digital assets. Our platform provides enterprise-grade security for all your digital properties.",
    icon: KeyIcon,
    features: [
      "Secure cryptocurrency wallets",
      "Protected NFT collections",
      "Encrypted digital documents",
      "Password-protected credentials"
    ]
  },
  {
    title: "Define Your Legacy Plan",
    description: "Create a comprehensive transfer plan by specifying beneficiaries and setting up automated smart contracts for seamless asset distribution.",
    icon: DocumentTextIcon,
    features: [
      "Flexible beneficiary system",
      "Custom transfer conditions",
      "Scheduled distributions",
      "Multi-party verification"
    ]
  },
  {
    title: "Secure Transfer Execution",
    description: "Rest assured knowing your legacy plan will be executed exactly as specified, with full transparency and security through blockchain technology.",
    icon: ShieldCheckIcon,
    features: [
      "Automated secure transfers",
      "Blockchain-verified process",
      "Instant status updates",
      "Complete transfer history"
    ]
  }
];
