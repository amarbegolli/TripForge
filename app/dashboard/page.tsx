"use client"

import { useEffect, useState } from "react"
import Link from "next/link"


function getTripStatus(startDate: string, endDate: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0,)
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (today < start) return "Upcoming"
  if (today >= start && today <= end) return "Active"
  return "Completed"
}

function getStatusStyle(status: string): string {
  if (status === "Upcoming") return "bg-blue-500/30 text-blue-300"
  if (status === "Active") return "bg-orange-500/30 text-orange-300"
  if (status === "Completed") return "bg-green-500/30 text-green-300"
  return "bg-yellow-500/30 text-yellow-300"
}

type Trip = {
  id: string
  destination: string
  startDate: string
  endDate: string
  interests: string
  status: string
}

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
  }, [])

  async function deleteTrip(id: string) {
    if (!confirm("Are you sure you want to delete this trip?")) return

    await fetch("/api/trips", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    setTrips(trips.filter((t) => t.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white">My Trips</h1>
            <p className="text-gray-400 mt-1">{trips.length} trips planned</p>
          </div>
          <Link href="/new-trip">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg">
              + New Trip
            </button>
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-2xl mb-2">No trips yet</p>
            <p>Click "+ New Trip" to plan your first adventure!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 hover:bg-gray-800 transition-all group relative"
              >
                <button
                  onClick={() => deleteTrip(trip.id)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors text-lg"
                >
                  ✕
                </button>
                <div className="text-4xl mb-4">✈️</div>
                <h2 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                  {trip.destination}
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  📅 {trip.startDate} → {trip.endDate}
                </p>
                {trip.interests && (
                  <p className="text-gray-500 text-sm mt-1">
                    🎯 {trip.interests}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(getTripStatus(trip.startDate, trip.endDate))}`}>
                    {getTripStatus(trip.startDate, trip.endDate)}
                  </span>
                  <a href={`/trip/${trip.id}`} className="text-gray-600 hover:text-orange-400 transition-colors text-lg">→</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}