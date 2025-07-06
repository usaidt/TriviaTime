import type { Metadata } from 'next'
import './globals.css'
import { QuizProvider } from '@/contexts/quiz-context'

export const metadata: Metadata = {
  title: 'TriviaTime',
  description: 'Created by Usaid T.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  )
}
