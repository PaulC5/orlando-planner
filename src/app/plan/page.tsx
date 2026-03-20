"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PROGRESS_KEY = "orlandoPlanProgress";

// Question data - Katie's voice
const questions = [
  {
    id: "experience",
    section: "Getting Started",
    question: "First things first—is this your first rodeo in Orlando?",
    type: "single",
    options: ["Yes, total newbie!", "Been once or twice", "I practically live here"],
  },
  {
    id: "vibe",
    section: "Getting Started",
    question: "What's the vibe? Are we going full chaos mode or keeping it chill?",
    type: "single",
    options: [
      "Relaxed — no rushing, plenty of pool time",
      "Balanced — active but not insane",
      "GO MODE — pack it all in, sleep when we're dead",
    ],
  },
  {
    id: "days",
    section: "Trip Basics",
    question: "How many days do I have to work with?",
    type: "single",
    options: ["2-3 days (quick hit)", "4-5 days (sweet spot)", "6-7 days (living the dream)", "8+ days (okay, show-off 😄)"],
  },
  {
    id: "timing",
    section: "Trip Basics",
    question: "When are you thinking of visiting?",
    type: "single",
    options: [
      "Spring (Mar-May)",
      "Summer (Jun-Aug) — it's HOT",
      "Fall (Sep-Nov)",
      "Winter (Dec-Feb)",
      "Not sure yet",
    ],
  },
  {
    id: "groupSize",
    section: "Your Group",
    question: "How many people are in your crew?",
    type: "single",
    options: ["2 people", "3-4 people", "5-6 people", "7+ people (wow!)"],
  },
  {
    id: "ages",
    section: "Your Group",
    question: "Who's coming on this adventure? (Pick all that apply)",
    type: "multi",
    options: [
      "Toddlers (0-4)",
      "Young kids (5-8)",
      "Tweens (9-12)",
      "Teenagers (13-17)",
      "Adults (18-64)",
      "Seniors (65+)",
    ],
  },
  {
    id: "parks",
    section: "Theme Parks",
    question: "Which parks are calling your name? (Pick all that sound good)",
    type: "multi",
    options: [
      "Magic Kingdom (the classic)",
      "EPCOT (food! future! booze!)",
      "Hollywood Studios (Star Wars, baby)",
      "Animal Kingdom (animals + rides)",
      "Universal Studios (Harry Potter, etc.)",
      "Islands of Adventure (Jurassic, Marvel, more Potter)",
      "SeaWorld",
      "LEGOLAND (if you've got little ones)",
      "Not sure — help me decide, Katie!",
    ],
  },
  {
    id: "crowds",
    section: "Theme Parks",
    question: "Real talk: how do you feel about crowds and lines?",
    type: "single",
    options: [
      "I hate them—I'll pay to skip lines",
      "Meh, I'll deal if I have to",
      "Crowds don't bother me, we vibe",
    ],
  },
  {
    id: "dining",
    section: "Food & Stays",
    question: "What's your dining style?",
    type: "multi",
    options: [
      "Character dining (meals with Mickey & friends)",
      "Quick service / casual — easy and cheap",
      "Fine dining — treat ourselves",
      "Budget-friendly",
      "Cook at our rental",
    ],
  },
  {
    id: "accommodation",
    section: "Food & Stays",
    question: "Where are you thinking of crashing at night?",
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
    question: "What's your ballpark budget for the whole trip?",
    type: "single",
    options: [
      "Under $2,000",
      "$2,000 - $4,000",
      "$4,000 - $7,000",
      "$7,000+",
      "Prefer not to say",
    ],
  },
];

export default function PlanPage() {
  const router = useRouter();

  // Lazy initializers — restore progress from localStorage on mount
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) return JSON.parse(saved).currentStep ?? 0;
    } catch {}
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) return JSON.parse(saved).answers ?? {};
    } catch {}
    return {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Persist progress to localStorage whenever answers or step change
  useEffect(() => {
    try {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ currentStep, answers })
      );
    } catch {}
  }, [currentStep, answers]);

  // Clear saved progress and reset form
  const handleStartOver = useCallback(() => {
    localStorage.removeItem(PROGRESS_KEY);
    setCurrentStep(0);
    setAnswers({});
  }, []);

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
    setIsSubmitting(true);

    // Store answers in localStorage for the results page (email no longer required)
    const submission = { ...answers };
    localStorage.setItem("orlandoPlanAnswers", JSON.stringify(submission));

    // Clear in-progress form state so it doesn't restore stale data
    localStorage.removeItem(PROGRESS_KEY);

    // Navigate to results page where we'll generate the itinerary
    router.push("/results");
  };

  const isLastStep = currentStep === questions.length - 1;

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Screen reader announcements */}
        <div role="status" aria-live="polite" className="sr-only">
          Question {currentStep + 1} of {questions.length}: {currentQuestion.question}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>{currentQuestion.section}</span>
            <span aria-label={`Question ${currentStep + 1} of ${questions.length}`}>
              {currentStep + 1} of {questions.length}
            </span>
          </div>
          <div 
            className="h-2 bg-white/20 rounded-full overflow-hidden" 
            role="progressbar" 
            aria-valuenow={currentStep + 1} 
            aria-valuemin={1} 
            aria-valuemax={questions.length}
            aria-label="Question progress"
          >
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Katie avatar and speech bubble */}
        <div className="flex gap-4 items-start">
          {/* Katie avatar */}
          <img 
            src="/katie-avatar.png" 
            alt="Katie, your Orlando AI travel concierge" 
            className="w-20 h-20 rounded-full shadow-lg flex-shrink-0"
          />
          
          {/* Speech bubble - Question card */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 flex-1">
            {/* Speech bubble tail */}
            <div className="absolute -left-3 top-6 w-0 h-0 
              border-t-[15px] border-t-transparent
              border-r-[20px] border-r-white
              border-b-[15px] border-b-transparent"
            ></div>
          <h2 id="question-heading" className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Single select options */}
          {currentQuestion.type === "single" && (
            <div className="space-y-3" role="radiogroup" aria-labelledby="question-heading">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSingleSelect(option)}
                  role="radio"
                  aria-checked={answers[currentQuestion.id] === option}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-medium ${
                    answers[currentQuestion.id] === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
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
              <div className="space-y-3" role="group" aria-labelledby="question-heading">
                {currentQuestion.options.map((option) => {
                  const selected = (
                    (answers[currentQuestion.id] as string[]) || []
                  ).includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleMultiSelect(option)}
                      role="checkbox"
                      aria-checked={selected}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-medium ${
                        selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center">
                        <span
                          className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            selected
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          }`}
                          aria-hidden="true"
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
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleNext}
                  disabled={
                    !answers[currentQuestion.id] ||
                    (answers[currentQuestion.id] as string[]).length === 0
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:ring-4 focus:ring-blue-500 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all focus:outline-none"
                >
                  Continue
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:underline font-medium focus:outline-none"
                  aria-label="Skip this question"
                >
                  Skip
                </button>
              </div>
            </>
          )}

          {/* Submit button on last single-select step */}
          {isLastStep && currentQuestion.type === "single" && answers[currentQuestion.id] && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 focus:ring-4 focus:ring-yellow-600 disabled:bg-gray-300 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all text-lg focus:outline-none"
            >
              {isSubmitting ? "Katie's building your plan..." : "Build My Plan, Katie! ✨"}
            </button>
          )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex justify-between" aria-label="Question navigation">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-white opacity-75 hover:opacity-100 focus:opacity-100 focus:underline disabled:opacity-30 focus:outline-none"
            aria-label="Go back to previous question"
          >
            ← Back
          </button>
          {currentQuestion.type === "single" && answers[currentQuestion.id] && (
            <button
              onClick={handleNext}
              className="text-white opacity-75 hover:opacity-100 focus:opacity-100 focus:underline focus:outline-none"
              aria-label="Skip to next question"
            >
              Skip →
            </button>
          )}
        </nav>

        {/* Minimal footer for question flow */}
        <div className="mt-12 text-center text-white/50 text-xs">
          {currentStep > 0 && (
            <>
              <button
                onClick={handleStartOver}
                className="hover:text-white/80 transition-colors mx-2 underline"
              >
                Start Over
              </button>
              •
            </>
          )}
          <Link href="/privacy" className="hover:text-white/80 transition-colors mx-2">
            Privacy
          </Link>
          •
          <Link href="/terms" className="hover:text-white/80 transition-colors mx-2">
            Terms
          </Link>
        </div>
      </div>
    </main>
  );
}
