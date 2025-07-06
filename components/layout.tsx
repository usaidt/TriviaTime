import type { ReactNode } from "react"
import Head from "next/head"
import Link from "next/link"

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = "Trivia Time" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Test your knowledge with Trivia Time!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        <div className="relative z-10">
          <header className="p-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="hover:scale-105 transition-transform">
                <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse">
                  🧠 Trivia Time
                </h1>
              </Link>
              <nav>
                <Link
                  href="/about"
                  className="px-4 py-2 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-lg font-medium"
                >
                  About
                </Link>
              </nav>
            </div>
          </header>
          <main className="container mx-auto px-4 pb-8">{children}</main>
        </div>
      </div>
    </>
  )
}
