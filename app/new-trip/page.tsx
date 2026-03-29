"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewTrip() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [itinerary, setItinerary] = useState("")

    const [formData, setFormData] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        interests: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setItinerary("")
    
    const aiRes = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const aiData = await aiRes.json()
    setItinerary(aiData.itinerary)

    await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

     setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Plan a New Trip</h1>
        <p className="text-gray-400 mb-10">Tell us where you want to go and AI will plan it for you.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Destination</label>
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Rome, Italy"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Interests</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. food, history, hiking, museums..."
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            {loading ? "AI is planning your trip... ✨" : "Generate Trip with AI ✨"}
          </button>
        </form>

        {itinerary && (
          <div className="mt-10 bg-gray-900 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">Your AI Itinerary ✈️</h2>
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {itinerary}
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Save & Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </main>
  )
}