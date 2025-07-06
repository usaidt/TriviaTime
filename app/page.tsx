"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import QuizSettings from "@/components/quiz-settings"
import { useQuiz } from "@/contexts/quiz-context"

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { state: quizState, dispatch: quizDispatch } = useQuiz()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStartQuiz = () => {
    router.push("/start")
  }

  // Use a try-catch to handle potential context issues
  if (!quizState) {
    console.error("Quiz context error: Context is undefined")
    return (
      <Layout title="Trivia Time - Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">❌</div>
            <p>Failed to initialize quiz. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  // Show loading while mounting or context initializes
  if (!mounted || !quizState?.isInitialized) {
    return (
      <Layout title="Trivia Time - Loading">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p>Loading Trivia Time...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Trivia Time - Home">
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center space-y-8">
          <div className="mb-12">
            <div className="text-6xl mb-4 animate-bounce">🧠</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to Trivia Time!</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Test your knowledge across various categories and difficulty levels. Challenge yourself and see how much
              you really know!
            </p>
          </div>

          <QuizSettings onStartQuiz={handleStartQuiz} />
          
          <div className="pt-8">
            <button
              onClick={() => router.push("/about")}
              className="text-gray-400 hover:text-white transition-colors underline decoration-dotted"
            >
              Learn more about this project
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}