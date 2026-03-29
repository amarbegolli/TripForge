import Link from "next/link"

export default function Home () {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
    <h1 className="text-5xl font-bold text-orange-400"> Trip Forge</h1>
    <p className="mt-4 text-gray-400 text-lg">
    Plan your perfect trip with AI
    </p>
    <Link href="/dashboard">
    <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
    Get Started 
    </button>
    </Link>
    </main>
  )
}