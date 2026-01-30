import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 opacity-90">Last updated: January 30, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Katie (Orlando Planner) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered Orlando trip planning service.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li><strong>Email Address:</strong> Used to send you your personalized itinerary</li>
            <li><strong>Trip Preferences:</strong> Travel dates, group size, interests, and other planning details you share</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <ul>
            <li><strong>Usage Data:</strong> How you interact with our service</li>
            <li><strong>Device Information:</strong> Browser type, IP address, operating system</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Generate your personalized Orlando trip itinerary</li>
            <li>Email you your trip plan</li>
            <li>Improve our AI recommendations</li>
            <li>Communicate about service updates (with your consent)</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing purposes. 
            We may share data with:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Email delivery services (e.g., Resend), AI providers (e.g., OpenAI) to generate your itinerary</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Correct inaccurate information</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href="mailto:hello@orlando-planner.com">hello@orlando-planner.com</a>
          </p>

          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your email and trip data for as long as necessary to provide our service and as required by law. You may request deletion at any time.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect information from children under 13.
          </p>

          <h2>International Users</h2>
          <p>
            If you are accessing our service from outside the United States, your information may be transferred to and processed in the United States.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:{" "}
            <a href="mailto:hello@orlando-planner.com">hello@orlando-planner.com</a>
          </p>

          <div className="mt-8 pt-8 border-t">
            <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
