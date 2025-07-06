"use client"

import { decodeHtmlEntities } from "@/utils/api"

interface OptionsProps {
  answers: string[]
  correctAnswer: string
  selectedAnswer: string | null
  onAnswerSelect: (answer: string) => void
  showFeedback: boolean
}

export default function Options({
  answers,
  correctAnswer,
  selectedAnswer,
  onAnswerSelect,
  showFeedback,
}: OptionsProps) {
  const getOptionStyle = (answer: string) => {
    if (!showFeedback) {
      return selectedAnswer === answer
        ? "bg-yellow-400 text-black transform scale-105"
        : "bg-white/10 text-white hover:bg-white/20 hover:scale-102"
    }

    if (answer === correctAnswer) {
      return "bg-green-500 text-white transform scale-105"
    }

    if (answer === selectedAnswer && answer !== correctAnswer) {
      return "bg-red-500 text-white transform scale-105"
    }

    return "bg-white/10 text-gray-400"
  }

  const getOptionIcon = (answer: string) => {
    if (!showFeedback) return null

    if (answer === correctAnswer) {
      return <span className="text-2xl">✅</span>
    }

    if (answer === selectedAnswer && answer !== correctAnswer) {
      return <span className="text-2xl">❌</span>
    }

    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelect(answer)}
          disabled={showFeedback}
          className={`p-6 rounded-xl font-semibold text-left transition-all duration-300 transform ${getOptionStyle(answer)} ${
            !showFeedback ? "hover:shadow-lg active:scale-95" : "cursor-default"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="flex-1 text-lg">{decodeHtmlEntities(answer)}</span>
            {getOptionIcon(answer)}
          </div>
        </button>
      ))}
    </div>
  )
}
