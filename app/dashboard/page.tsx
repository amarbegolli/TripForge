import Link from "next/link"
import { prisma } from "@/lib/prisma"


const statusColors: Record<string, string> = {
    Upcoming: "bg-blue-500/20 text-blue-400",
    Planned: "bg-yellow-500/20 text-yellow-400",
    Completed: "bg-green-500/20 text-green-400"
}

export default async function Dashboard () {
    const trips = await prisma.trip.findMany({
        orderBy: { createdAt: "desc"},
    })

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
            {trips.map((trip: any) => (
              <div
                key={trip.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 hover:bg-gray-800 transition-all cursor-pointer group"
              >
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
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[trip.status] ?? "bg-gray-500/20 text-gray-400"}`}>
                    {trip.status}
                  </span>
                  <span className="text-gray-600 group-hover:text-orange-400 transition-colors text-lg">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}