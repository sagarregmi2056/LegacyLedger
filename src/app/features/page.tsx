export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12">Features</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Secure Asset Storage"
                        description="Store your digital assets securely on the Ethereum blockchain with military-grade encryption."
                    />
                    <FeatureCard
                        title="Smart Inheritance"
                        description="Set up automatic asset transfer to your beneficiaries with customizable conditions."
                    />
                    <FeatureCard
                        title="Multi-Signature Security"
                        description="Add extra security with multi-signature requirements for asset transfers."
                    />
                    <FeatureCard
                        title="Time-Locked Transfers"
                        description="Schedule future transfers with customizable time locks and conditions."
                    />
                    <FeatureCard
                        title="Asset Management"
                        description="Manage all your digital assets from a single, intuitive dashboard."
                    />
                    <FeatureCard
                        title="Transaction History"
                        description="Keep track of all your transactions with detailed history and reporting."
                    />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
} 