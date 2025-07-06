"use client"

import { useState, useEffect } from "react"
import { useQuiz } from "@/contexts/quiz-context"
import { fetchCategories } from "@/utils/api"

interface QuizSettingsProps {
  onStartQuiz: () => void
}

export default function QuizSettings({ onStartQuiz }: QuizSettingsProps) {
  const { state, dispatch } = useQuiz()
  const [localSettings, setLocalSettings] = useState(state.settings)

  useEffect(() => {
    // Fetch categories on component mount
    const loadCategories = async () => {
      const categories = await fetchCategories()
      dispatch({ type: "SET_CATEGORIES", payload: categories })
    }
    loadCategories()
  }, [dispatch])

  const handleSettingChange = (key: keyof typeof localSettings, value: string | number) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleStartQuiz = () => {
    dispatch({ type: "SET_SETTINGS", payload: localSettings })
    onStartQuiz()
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Customize Your Quiz</h2>
          <p className="text-gray-300">Choose your settings and test your knowledge!</p>
        </div>

        {/* Number of Questions */}
        <div className="space-y-4">
          <label className="block text-white font-semibold text-lg">Number of Questions: {localSettings.amount}</label>
          <input
            type="range"
            min="5"
            max="50"
            value={localSettings.amount}
            onChange={(e) => handleSettingChange("amount", Number.parseInt(e.target.value))}
            className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-300">
            <span>5</span>
            <span>50</span>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-4">
          <label className="block text-white font-semibold text-lg">Category</label>
          <select
            value={localSettings.category}
            onChange={(e) => handleSettingChange("category", e.target.value)}
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          >
            <option value="">Any Category</option>
            {state.categories.map((category) => (
              <option key={category.id} value={category.id} className="text-black">
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div className="space-y-4">
          <label className="block text-white font-semibold text-lg">Difficulty</label>
          <div className="grid grid-cols-4 gap-2">
            {["", "easy", "medium", "hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleSettingChange("difficulty", difficulty)}
                className={`p-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  localSettings.difficulty === difficulty
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {difficulty || "Any"}
              </button>
            ))}
          </div>
        </div>

        {/* Question Type */}
        <div className="space-y-4">
          <label className="block text-white font-semibold text-lg">Question Type</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "", label: "Any Type" },
              { value: "multiple", label: "Multiple Choice" },
              { value: "boolean", label: "True/False" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => handleSettingChange("type", type.value)}
                className={`p-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  localSettings.type === type.value
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartQuiz}
          className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  )
}
