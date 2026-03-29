import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { destination, startDate, endDate, interests} = body

    if (!destination || !startDate || !endDate) {
        return NextResponse.json(
            { error: "Please fill all fields" },
            { status: 400 }
        )
    }

    const trip = await prisma.trip.create ({
        data: {
            destination,
            startDate,
            endDate,
            interests,
            status: "Planning",
        },
    })

    return NextResponse.json(trip)
}


export async function GET() {
    const trips = await prisma.trip.findMany({
        orderBy: { createdAt: "desc"},
    })    
    return NextResponse.json(trips)
}