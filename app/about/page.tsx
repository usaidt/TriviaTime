"use client"

import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function About() {
  const router = useRouter()

  return (
    <Layout title="Trivia Time - About">
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Trivia Time</h1>
            <p className="text-xl text-gray-300">
              A fun and interactive trivia game built for the HackClub Reactive event
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-center space-y-8">
              {/* Creator Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Created by</h2>
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Usaid Tirmizi
                </div>
              </div>

              {/* Event Info */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">Built for</h3>
                <p className="text-lg text-gray-300">
                  HackClub Reactive Event - Showcasing modern web development with React and Next.js
                </p>
              </div>
              
              {/* Features */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Features</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Multiple categories & difficulties
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Real-time scoring
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Beautiful gradient design
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Responsive layout
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Progress tracking
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Modern tech stack
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Built with</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                    Next.js
                  </span>
                  <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                    React
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    TypeScript
                  </span>
                  <span className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
                    Tailwind CSS
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                    Open Trivia DB API
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/usaidt/triviatime"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:scale-105 transition-transform hover:from-gray-600 hover:to-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              View on GitHub
            </a>
            <Button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Start Playing
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
