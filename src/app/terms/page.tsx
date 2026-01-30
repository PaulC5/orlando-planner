import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="mt-2 opacity-90">Last updated: January 30, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-lg max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By using Katie (Orlando Planner), you agree to these Terms of Service. If you do not agree, please do not use our service.
          </p>

          <h2>Description of Service</h2>
          <p>
            Katie is an AI-powered travel planning tool that generates personalized Orlando vacation itineraries based on your preferences. 
            Our service uses artificial intelligence to provide recommendations for theme parks, dining, activities, and timing.
          </p>

          <h2>AI-Generated Content Disclaimer</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <p className="font-semibold mb-2">Important Notice:</p>
            <ul className="mb-0">
              <li>Katie&apos;s recommendations are <strong>AI-generated</strong> and may not reflect real-time changes</li>
              <li>Park hours, closures, special events, and pricing are subject to change</li>
              <li>Always verify critical details (reservations, operating hours, ticket prices) with official sources before your trip</li>
              <li>We are not affiliated with Disney, Universal, or other theme parks mentioned</li>
            </ul>
          </div>

          <h2>No Guarantees</h2>
          <p>
            Our service is provided &quot;as-is&quot; without warranties of any kind. We do not guarantee:
          </p>
          <ul>
            <li>Accuracy of all recommendations</li>
            <li>Availability of suggested activities or reservations</li>
            <li>That following the itinerary will result in a perfect vacation</li>
            <li>Real-time updates to park schedules or closures</li>
          </ul>

          <h2>User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Verify all recommendations with official sources</li>
            <li>Make your own reservations and bookings</li>
            <li>Check park hours, ticket requirements, and policies</li>
            <li>Use the service for personal, non-commercial purposes</li>
            <li>Provide accurate information when creating your itinerary</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Katie (Orlando Planner) and its creators shall not be liable for any:
          </p>
          <ul>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Costs resulting from inaccurate recommendations</li>
            <li>Missed reservations, closed attractions, or schedule changes</li>
            <li>Travel delays, cancellations, or other trip disruptions</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            The Katie brand, website design, and AI-generated content are owned by Orlando Planner. 
            You may use generated itineraries for personal use but may not republish or commercialize them without permission.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our service may contain links to third-party websites. We are not responsible for the content or practices of these sites.
          </p>

          <h2>Changes to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the service at any time without notice.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to the service at our discretion, without notice, for conduct that violates these Terms or is harmful to other users.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the United States. Any disputes shall be resolved in applicable courts.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms? Contact us at{" "}
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
