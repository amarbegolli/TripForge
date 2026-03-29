import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="bg-orange-500/10 text-orange-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
          ✨ AI-Powered Travel Planning
        </div>
        <h1 className="text-6xl font-bold text-white max-w-3xl leading-tight">
          Plan your perfect trip with <span className="text-orange-400">AI</span>
        </h1>
        <p className="mt-6 text-gray-400 text-xl max-w-xl">
          Tell us where you want to go and we'll create a personalized day-by-day itinerary in seconds.
        </p>
        <div className="flex gap-4 mt-10">
          <Link href="/new-trip">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg">
              Plan a Trip ✈️
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="border border-gray-700 hover:border-orange-500 text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors">
              My Trips
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-lg font-semibold text-white mb-2">AI Generated</h3>
          <p className="text-gray-400 text-sm">Powered by advanced AI to create personalized itineraries based on your interests.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold text-white mb-2">Instant Planning</h3>
          <p className="text-gray-400 text-sm">Get a complete day-by-day travel plan in seconds, not hours.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-3xl mb-4">🗺️</div>
          <h3 className="text-lg font-semibold text-white mb-2">Personalized</h3>
          <p className="text-gray-400 text-sm">Every itinerary is tailored to your interests, dates and travel style.</p>
        </div>
      </section>

    </main>
  )
}