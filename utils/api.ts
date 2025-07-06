import type { QuizSettings, Question } from "@/contexts/quiz-context"

export async function fetchCategories() {
  try {
    const response = await fetch("https://opentdb.com/api_category.php")
    const data = await response.json()
    return data.trivia_categories || []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function fetchQuestions(settings: QuizSettings): Promise<Question[]> {
  try {
    let url = `https://opentdb.com/api.php?amount=${settings.amount}`

    if (settings.category) {
      url += `&category=${settings.category}`
    }
    if (settings.difficulty) {
      url += `&difficulty=${settings.difficulty}`
    }
    if (settings.type) {
      url += `&type=${settings.type}`
    }

    const response = await fetch(url)
    const data = await response.json()

    if (data.response_code !== 0) {
      throw new Error("Failed to fetch questions")
    }

    // Shuffle answers for each question
    const questionsWithShuffledAnswers = data.results.map((question: Question) => {
      const allAnswers = [...question.incorrect_answers, question.correct_answer]
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)
      return {
        ...question,
        all_answers: shuffledAnswers,
      }
    })

    return questionsWithShuffledAnswers
  } catch (error) {
    console.error("Error fetching questions:", error)
    throw error
  }
}

export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}
