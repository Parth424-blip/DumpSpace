import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize the Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a thoughtful and empathetic reflective journal companion. When a user shares a journal entry, respond with a short, insightful, and supportive reflection (no more than 3-4 sentences). Help them see patterns, validate their feelings, or offer a gentle new perspective.",
        },
        {
          role: "user",
          content,
        },
      ],
      model: "llama-3.1-8b-instant", // Fast and capable model
    });

    const reflection =
      completion.choices[0]?.message?.content || "No reflection generated.";

    return NextResponse.json({ reflection });
  } catch (error) {
    console.error("Error generating reflection:", error);
    return NextResponse.json(
      { error: "Failed to generate reflection" },
      { status: 500 },
    );
  }
}
