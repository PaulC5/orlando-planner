"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Question data
const questions = [
  {
    id: "experience",
    section: "Getting Started",
    question: "Is this your first time visiting Orlando?",
    type: "single",
    options: ["Yes, first time!", "Been once or twice", "We're veterans"],
  },
  {
    id: "vibe",
    section: "Getting Started",
    question: "What's the vibe of your trip?",
    type: "single",
    options: [
      "Relaxed — no rushing, plenty of downtime",
      "Balanced — active but with breaks",
      "Go mode — pack in as much as possible",
    ],
  },
  {
    id: "days",
    section: "Trip Basics",
    question: "How many days will you be in Orlando?",
    type: "single",
    options: ["2-3 days", "4-5 days", "6-7 days", "8+ days"],
  },
  {
    id: "timing",
    section: "Trip Basics",
    question: "When are you planning to visit?",
    type: "single",
    options: [
      "Spring (Mar-May)",
      "Summer (Jun-Aug)",
      "Fall (Sep-Nov)",
      "Winter (Dec-Feb)",
      "Not sure yet",
    ],
  },
  {
    id: "groupSize",
    section: "Your Group",
    question: "How many people are in your group?",
    type: "single",
    options: ["2 people", "3-4 people", "5-6 people", "7+ people"],
  },
  {
    id: "ages",
    section: "Your Group",
    question: "Who's coming? (Select all that apply)",
    type: "multi",
    options: [
      "Toddlers (0-4)",
      "Young kids (5-8)",
      "Tweens (9-12)",
      "Teenagers (13-17)",
      "Adults only",
      "Seniors (65+)",
    ],
  },
  {
    id: "parks",
    section: "Theme Parks",
    question: "Which parks do you want to visit?",
    type: "multi",
    options: [
      "Magic Kingdom",
      "EPCOT",
      "Hollywood Studios",
      "Animal Kingdom",
      "Universal Studios",
      "Islands of Adventure",
      "SeaWorld",
      "LEGOLAND",
      "Not sure — help me decide",
    ],
  },
  {
    id: "crowds",
    section: "Theme Parks",
    question: "How important is avoiding crowds?",
    type: "single",
    options: [
      "Very — I'll pay extra to skip lines",
      "Somewhat — open to strategies",
      "Not really — we'll go with the flow",
    ],
  },
  {
    id: "dining",
    section: "Food & Stays",
    question: "What's your dining style?",
    type: "multi",
    options: [
      "Character dining (meals with characters)",
      "Quick service / casual",
      "Fine dining experiences",
      "Budget-friendly",
      "Cook at our rental",
    ],
  },
  {
    id: "accommodation",
    section: "Food & Stays",
    question: "Where are you thinking of staying?",
    type: "single",
    options: [
      "Disney Resort (on property)",
      "Universal Resort",
      "Off-site vacation rental",
      "Off-site hotel",
      "Not sure yet — need recommendations",
    ],
  },
  {
    id: "budget",
    section: "Budget",
    question: "What's your approximate budget for the whole trip?",
    type: "single",
    options: [
      "Under $2,000",
      "$2,000 - $4,000",
      "$4,000 - $7,000",
      "$7,000+",
      "Prefer not to say",
    ],
  },
  {
    id: "email",
    section: "Get Your Plan",
    question: "Where should we send your itinerary?",
    type: "email",
    options: [],
  },
];

export default function PlanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSingleSelect = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleMultiSelect = (option: string) => {
    const current = (answers[currentQuestion.id] as string[]) || [];
    if (current.includes(option)) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: current.filter((o) => o !== option),
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...current, option],
      });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Store answers and email in localStorage for the results page
    const submission = { ...answers, email };
    localStorage.setItem("orlandoPlanAnswers", JSON.stringify(submission));
    
    // Navigate to results page where we'll generate the itinerary
    router.push("/results");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-700 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>{currentQuestion.section}</span>
            <span>{currentStep + 1} of {questions.length}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Single select options */}
          {currentQuestion.type === "single" && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSingleSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    answers[currentQuestion.id] === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Multi select options */}
          {currentQuestion.type === "multi" && (
            <>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const selected = (
                    (answers[currentQuestion.id] as string[]) || []
                  ).includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleMultiSelect(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <span className="flex items-center">
                        <span
                          className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            selected
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleNext}
                disabled={
                  !answers[currentQuestion.id] ||
                  (answers[currentQuestion.id] as string[]).length === 0
                }
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                Continue
              </button>
            </>
          )}

          {/* Email input */}
          {currentQuestion.type === "email" && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <p className="text-gray-500 text-sm mt-2">
                We&apos;ll send your personalized itinerary here. No spam, ever.
              </p>
              <button
                onClick={handleSubmit}
                disabled={!email || isSubmitting}
                className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all text-lg"
              >
                {isSubmitting ? "Creating your plan..." : "Get My Free Itinerary →"}
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-white opacity-75 hover:opacity-100 disabled:opacity-30"
          >
            ← Back
          </button>
          {currentQuestion.type === "single" && answers[currentQuestion.id] && (
            <button
              onClick={handleNext}
              className="text-white opacity-75 hover:opacity-100"
            >
              Skip →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
