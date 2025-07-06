"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import ResultsSummary from "@/components/results-summary"
import { useQuiz } from "@/contexts/quiz-context"

export default function Results() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { state: quizState, dispatch: quizDispatch } = useQuiz()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !quizState?.isInitialized) return

    // If no answers recorded, redirect to home
    if (!quizState.userAnswers || quizState.userAnswers.length === 0) {
      router.push("/")
      return
    }
  }, [mounted, quizState, router])

  const handlePlayAgain = () => {
    if (quizDispatch) {
      quizDispatch({ type: "RESET_QUIZ" })
    }
    router.push("/start")
  }

  const handleGoHome = () => {
    if (quizDispatch) {
      quizDispatch({ type: "RESET_QUIZ" })
    }
    router.push("/")
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

  // Handle context not being available or no answers
  if (!quizState?.isInitialized || !quizState.userAnswers || quizState.userAnswers.length === 0) {
    return (
      <Layout title="Trivia Time - Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">📊</div>
            <p className="mb-4">No quiz results available. Please complete a quiz first.</p>
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

  return (
    <Layout title="Trivia Time - Results">
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-xl text-gray-300">Here's how you performed:</p>
          </div>

          <ResultsSummary onPlayAgain={handlePlayAgain} onGoHome={handleGoHome} />
        </div>
      </div>
    </Layout>
  )
}
