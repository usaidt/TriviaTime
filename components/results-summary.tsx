"use client"

import { useQuiz } from "@/contexts/quiz-context"
import { decodeHtmlEntities } from "@/utils/api"

interface ResultsSummaryProps {
  onPlayAgain: () => void
  onGoHome: () => void
}

export default function ResultsSummary({ onPlayAgain, onGoHome }: ResultsSummaryProps) {
  const { state } = useQuiz()

  const correctAnswers = state.userAnswers.filter((answer) => answer.isCorrect).length
  const totalQuestions = state.userAnswers.length
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  const getScoreMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🏆", color: "text-yellow-400" }
    if (percentage >= 80) return { message: "Excellent! 🌟", color: "text-green-400" }
    if (percentage >= 70) return { message: "Great Job! 👏", color: "text-blue-400" }
    if (percentage >= 60) return { message: "Good Work! 👍", color: "text-purple-400" }
    return { message: "Keep Trying! 💪", color: "text-red-400" }
  }

  const scoreMessage = getScoreMessage()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Score Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
        <div className="mb-6">
          <div className="text-8xl mb-4">{percentage >= 80 ? "🏆" : percentage >= 60 ? "🎯" : "📚"}</div>
          <h2 className={`text-4xl font-bold mb-2 ${scoreMessage.color}`}>{scoreMessage.message}</h2>
          <p className="text-gray-300 text-lg">Quiz Complete!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-400">{correctAnswers}</div>
            <div className="text-gray-300">Correct</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="text-3xl font-bold text-red-400">{totalQuestions - correctAnswers}</div>
            <div className="text-gray-300">Incorrect</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="text-3xl font-bold text-yellow-400">{percentage}%</div>
            <div className="text-gray-300">Score</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onGoHome}
            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 shadow-lg transform transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
          >
            🏠 Home
          </button>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Question Breakdown</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {state.userAnswers.map((answer, index) => {
            const question = state.questions[answer.questionIndex]
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border-l-4 ${
                  answer.isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-white">Question {index + 1}</span>
                  <span className={`text-2xl ${answer.isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {answer.isCorrect ? "✅" : "❌"}
                  </span>
                </div>
                <p className="text-gray-300 mb-2 text-sm">{decodeHtmlEntities(question.question)}</p>
                <div className="text-sm space-y-1">
                  <div className="text-green-400">✓ Correct: {decodeHtmlEntities(answer.correctAnswer)}</div>
                  {!answer.isCorrect && (
                    <div className="text-red-400">✗ Your answer: {decodeHtmlEntities(answer.selectedAnswer)}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
