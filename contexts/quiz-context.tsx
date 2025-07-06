"use client"

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface Question {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  all_answers?: string[]
}

export interface QuizSettings {
  amount: number
  category: string
  difficulty: string
  type: string
}

export interface UserAnswer {
  questionIndex: number
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

interface QuizState {
  settings: QuizSettings
  questions: Question[]
  currentQuestionIndex: number
  userAnswers: UserAnswer[]
  isLoading: boolean
  error: string | null
  categories: Array<{ id: number; name: string }>
  isInitialized: boolean
}

type QuizAction =
  | { type: "SET_SETTINGS"; payload: QuizSettings }
  | { type: "SET_QUESTIONS"; payload: Question[] }
  | { type: "SET_CURRENT_QUESTION"; payload: number }
  | { type: "ADD_ANSWER"; payload: UserAnswer }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CATEGORIES"; payload: Array<{ id: number; name: string }> }
  | { type: "SET_INITIALIZED"; payload: boolean }
  | { type: "RESET_QUIZ" }

const initialState: QuizState = {
  settings: {
    amount: 10,
    category: "",
    difficulty: "",
    type: "",
  },
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  isLoading: false,
  error: null,
  categories: [],
  isInitialized: false,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_SETTINGS":
      return { ...state, settings: action.payload }
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload }
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestionIndex: action.payload }
    case "ADD_ANSWER":
      return { ...state, userAnswers: [...state.userAnswers, action.payload] }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }
    case "SET_INITIALIZED":
      return { ...state, isInitialized: action.payload }
    case "RESET_QUIZ":
      return {
        ...initialState,
        categories: state.categories,
        isInitialized: true,
      }
    default:
      return state
  }
}

interface QuizContextType {
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  useEffect(() => {
    // Initialize the context after mounting
    const timer = setTimeout(() => {
      dispatch({ type: "SET_INITIALIZED", payload: true })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error(
      "useQuiz must be used within a QuizProvider. Make sure your component is wrapped with QuizProvider.",
    )
  }
  return context
}

// Create a custom hook for safe usage
export function useQuizSafe(): QuizContextType | null {
  const context = useContext(QuizContext)
  return context || null
}
