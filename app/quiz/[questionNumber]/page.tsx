"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Layout from "@/components/layout"
import QuizQuestion from "@/components/quiz-question"
import { useQuiz } from "@/contexts/quiz-context"

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const [mounted, setMounted] = useState(false)
  const { state: quizState } = useQuiz()

  const questionNumber = params ? parseInt(params.questionNumber as string, 10) : 1

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !quizState?.isInitialized) return

    // If no questions are loaded, redirect to home
    if (!quizState.questions || quizState.questions.length === 0) {
      router.push("/")
      return
    }

    // If question number is invalid, redirect to first question
    if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > quizState.questions.length) {
      router.push("/quiz/1")
      return
    }
  }, [mounted, quizState, questionNumber, router])

  const handleNext = () => {
    if (questionNumber < quizState.questions.length) {
      router.push(`/quiz/${questionNumber + 1}`)
    } else {
      router.push("/results")
    }
  }

  // Show loading while mounting
  if (!mounted) {
    return (
      <Layout title="Trivia Time - Loading">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Handle context not being available or no questions
  if (!quizState?.isInitialized || !quizState.questions || quizState.questions.length === 0) {
    return (
      <Layout title="Trivia Time - Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="mb-4">No quiz questions available. Please start a new quiz.</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Start New Quiz
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  // Validate question number
  if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > quizState.questions.length) {
    return (
      <Layout title="Trivia Time - Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">🔢</div>
            <p className="mb-4">Invalid question number.</p>
            <button
              onClick={() => router.push("/quiz/1")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Go to First Question
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Trivia Time - Question ${questionNumber}`}>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">
                Question {questionNumber} of {quizState.questions.length}
              </span>
              <span className="text-sm text-gray-300">
                {Math.round((questionNumber / quizState.questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(questionNumber / quizState.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <QuizQuestion questionNumber={questionNumber} onNext={handleNext} />
        </div>
      </div>
    </Layout>
  )
}
