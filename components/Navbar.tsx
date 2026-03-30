import Link from "next/link"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function Navbar () {
    const { userId } = await auth()

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-orange-400 font-bold text-xl">
            Trip Forge
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                </Link>

            {userId ? (
                <>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                    My Trips
                </Link>
                <UserButton />
                </>
            ) : (
                        <Link href="/sign-in" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-semibold transition-colors">
                          Sign In
                        </Link>
                    
                )}
            </div>
        </nav>
    )
}