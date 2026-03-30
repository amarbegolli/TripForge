import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { ClerkProvider } from "@clerk/nextjs"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "TripForge",
    description: "Plan your perfect trip with AI"
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geist.className} bg-gray-950`}>
        <Navbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}