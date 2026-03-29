import Link from "next/link"

export default function Navbar () {
    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-orange-400 font-bold text-xl">
            Trip Forge
            </Link>
            <div className="flex gap-6">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    My Trips
                </Link>
            </div>
        </nav>
    )
}