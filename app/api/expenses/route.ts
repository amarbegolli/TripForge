import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"


export async function POST(req: NextRequest) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized", status: 401})

    const { tripId, category, amount, note } = await req.json()

    const expense = await prisma.expense.create({
        data: { tripId, category, amount: parseFloat(amount), note},
    })

    return NextResponse.json(expense)
}

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if(!userId) return NextResponse.json({ error: "Unauthorized", status: 401})
        
    const { searchParams } = new URL(req.url)
    const tripId = searchParams.get("tripId")

    const expenses = await prisma.expense.findMany({
        where: { tripId: tripId ?? undefined},
        orderBy: { createdAt: "desc"}
    })

    return NextResponse.json(expenses)
}


export async function DELETE(req: NextRequest) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized", status: 401})

    const { id } = await req.json()

    await prisma.expense.delete({ where: { id } })

    return NextResponse.json ({ success: true })
}