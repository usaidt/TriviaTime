"use client"

import { useState } from "react"
import { useQuiz } from "@/contexts/quiz-context"
import { decodeHtmlEntities } from "@/utils/api"
import Options from "./options"

interface QuizQuestionProps {
  questionNumber: number
  onNext: () => void
}

export default function QuizQuestion({ questionNumber, onNext }: QuizQuestionProps) {
  const { state, dispatch } = useQuiz()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentQuestion = state.questions[questionNumber - 1]

  if (!currentQuestion) {
    return (
      <div className="text-center text-white">
        <p>Question not found</p>
      </div>
    )
  }

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return // Prevent multiple selections

    setSelectedAnswer(answer)
    setShowFeedback(true)

    const isCorrect = answer === currentQuestion.correct_answer

    dispatch({
      type: "ADD_ANSWER",
      payload: {
        questionIndex: questionNumber - 1,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      },
    })
  }

  const handleNext = () => {
    onNext()
  }

  const progress = (questionNumber / state.questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">
            Question {questionNumber} of {state.questions.length}
          </span>
          <span className="text-yellow-400 font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400/20 rounded-full p-4 mb-4">
            <span className="text-4xl">❓</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {decodeHtmlEntities(currentQuestion.question)}
          </h2>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">{currentQuestion.difficulty}</span>
            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
              {decodeHtmlEntities(currentQuestion.category)}
            </span>
          </div>
        </div>

        <Options
          answers={currentQuestion.all_answers || []}
          correctAnswer={currentQuestion.correct_answer}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showFeedback={showFeedback}
        />

        {showFeedback && (
          <div className="mt-8 text-center">
            <div
              className={`inline-block p-4 rounded-xl mb-4 ${
                selectedAnswer === currentQuestion.correct_answer
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {selectedAnswer === currentQuestion.correct_answer ? (
                <span className="text-2xl">🎉 Correct!</span>
              ) : (
                <span className="text-2xl">❌ Incorrect!</span>
              )}
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            >
              {questionNumber === state.questions.length ? "View Results" : "Next Question"} →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
