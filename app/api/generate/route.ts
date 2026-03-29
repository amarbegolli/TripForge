import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  const { destination, startDate, endDate, interests } = await req.json()

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Create a detailed travel itinerary for a trip to ${destination}.
Travel dates: ${startDate} to ${endDate}.
Traveler interests: ${interests}.

Format the response as a day-by-day plan with:
- Morning activity
- Lunch recommendation
- Afternoon activity
- Dinner recommendation
- Evening suggestion

Make it specific, fun and practical. Use emojis to make it engaging.`,
      },
    ],
  })

  const itinerary = completion.choices[0]?.message?.content ?? ""
  return NextResponse.json({ itinerary })
}
