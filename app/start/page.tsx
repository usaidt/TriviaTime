"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { useQuiz } from "@/contexts/quiz-context"
import { fetchQuestions } from "@/utils/api"

export default function Start() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)
  const [loadingMessage, setLoadingMessage] = useState("Preparing your quiz...")
  const [mounted, setMounted] = useState(false)
  const { state: quizState, dispatch: quizDispatch } = useQuiz()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Don't proceed if not mounted or context not initialized
    if (!mounted || !quizState?.isInitialized || !quizDispatch) {
      return
    }

    const loadQuiz = async () => {
      try {
        quizDispatch({ type: "SET_LOADING", payload: true })
        quizDispatch({ type: "SET_ERROR", payload: null })

        setLoadingMessage("Fetching questions...")

        const questions = await fetchQuestions({
          amount: quizState.settings.amount,
          category: quizState.settings.category === "any" ? "" : quizState.settings.category,
          difficulty: quizState.settings.difficulty === "any" ? "" : quizState.settings.difficulty,
          type: quizState.settings.type === "any" ? "" : quizState.settings.type,
        })

        if (!questions || questions.length === 0) {
          throw new Error("No questions received from the API")
        }

        quizDispatch({ type: "SET_QUESTIONS", payload: questions })
        quizDispatch({ type: "SET_LOADING", payload: false })

        setLoadingMessage("Starting quiz...")

        // Start countdown
        let timeLeft = 3
        const countdownInterval = setInterval(() => {
          timeLeft -= 1
          setCountdown(timeLeft)

          if (timeLeft <= 0) {
            clearInterval(countdownInterval)
            router.push("/quiz/1")
          }
        }, 1000)

        return () => clearInterval(countdownInterval)
      } catch (error) {
        console.error("Failed to load quiz:", error)
        quizDispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "Failed to load quiz questions",
        })
        quizDispatch({ type: "SET_LOADING", payload: false })
      }
    }

    loadQuiz()
  }, [mounted, quizState?.isInitialized, quizDispatch, router])

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

  // Handle context not being available
  if (!quizState?.isInitialized) {
    return (
      <Layout title="Trivia Time - Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="mb-4">Quiz not configured. Please go back and select your quiz settings.</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Go Back to Settings
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  // Show error state
  if (quizState.error) {
    return (
      <Layout title="Trivia Time - Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white max-w-md">
            <div className="text-4xl mb-4">💥</div>
            <p className="mb-4 text-red-400">{quizState.error}</p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="block w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Back to Settings
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Show loading state
  if (quizState.isLoading) {
    return (
      <Layout title="Trivia Time - Loading Quiz">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-6 animate-bounce">🧠</div>
            <div className="text-2xl font-bold mb-4">{loadingMessage}</div>
            <div className="w-64 bg-gray-700 rounded-full h-4 mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Show countdown
  return (
    <Layout title="Trivia Time - Starting Quiz">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-8xl mb-8 animate-pulse">{countdown}</div>
          <div className="text-2xl font-bold">Get Ready!</div>
          <div className="text-lg text-gray-300 mt-2">Your quiz is about to begin...</div>
        </div>
      </div>
    </Layout>
  )
}
