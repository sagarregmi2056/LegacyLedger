export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">About Legacy Ledger</h1>

                <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            Legacy Ledger is dedicated to revolutionizing digital asset inheritance through blockchain technology.
                            We aim to provide a secure, transparent, and user-friendly platform for managing digital assets and
                            ensuring they reach their intended beneficiaries.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Built on secure Ethereum blockchain technology</li>
                            <li>Transparent and immutable transaction records</li>
                            <li>User-friendly interface for all experience levels</li>
                            <li>Customizable inheritance conditions</li>
                            <li>Multi-signature security features</li>
                            <li>Dedicated customer support</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
                        <p className="text-gray-600">
                            We leverage the latest in blockchain technology, including smart contracts on the Ethereum network,
                            to provide secure and efficient asset management. Our platform is built with Next.js, TypeScript,
                            and modern web technologies to ensure a seamless user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className="text-gray-600">
                            Have questions or need support? Reach out to our team at{' '}
                            <a href="mailto:support@legacy-ledger.com" className="text-blue-600 hover:text-blue-800">
                                support@legacy-ledger.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
} 