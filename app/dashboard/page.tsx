import Link from "next/link"


const trips = [
    {id: 1, destination: "Paris, France", dates: "Jun 10 - Jun 17", status: "Upcoming", emoji: "🗼"},
    {id: 2, destination: "Tokyo, Japan", dates: "Sep 23 - Sep 30", status: "Planned", emoji: "🏯"},
    {id: 3, destination: "Prishtina, Kosovo", dates: "Mar 26 - Mar 26", status: "Completed", emoji: "🦅"}
]

const statusColors: Record<string, string> = {
    Upcoming: "bg-blue-500/20 text-blue-400",
    Planned: "bg-yellow-500/20 text-yellow-400",
    Completed: "bg-green-500/20 text-green-400"
}

export default function Dashboard () {
    return (
        <main className="min-h-screen bg-gray-950 text-white ">
            <div className="max-w-5xl mx-auto px-6 py-12">

            <div className="flex items-center justify-between mb-10">
                <div>
                <h1 className="text-4xl font-bold text-white">My Trips</h1>
                <p className="text-gray-400 mt-1"> Trips Planned</p>
                </div>
                <Link href="/new-trip">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg">
                    + New Trip
                </button>
                </Link>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                        <div key={trip.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors cursor-pointer group">
                            <div className="text-4xl mb-4"> {trip.emoji} </div>
                            <h2 className="text-xl font-semibold text-white group-hover:texy-orange-400 transition-colors"> {trip.destination} </h2>
                            <p className="text-gray-400 text-sm mt-2 flex items-center gap-1"> {trip.dates} </p>
                        <div className="mt-4 items-center justify-between">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[trip.status]}`}>
                                {trip.status}
                            </span>
                            <span className="text-gray-600 group-hover:text-orange-400 transition-colors text-lg"> -- </span>
                            </div>
                        </div>
                    ))}
               </div>
            </div> 
        </main>
        )
    }