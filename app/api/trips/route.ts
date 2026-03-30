import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const { userId } = await auth()
    if(!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401})
   
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
            userId,
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
    const { userId } = await auth()
    if(!userId) return NextResponse.json({ error: "Unauthorized", stauts: 401})
    
        const trips = await prisma.trip.findMany({
        where: { userId },
        orderBy: { createdAt: "desc"},
    })    
    return NextResponse.json(trips)
}

export async function DELETE(req: NextRequest) {
    const { userId } = await auth()
    if(!userId) return NextResponse.json({ error: "Unauthorized", status: 401}

    )
    const { id } = await req.json()

    await prisma.trip.delete({
        where: { id, userId },
    })
    return NextResponse.json({ success: true })
}