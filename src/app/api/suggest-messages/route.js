import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env["GROQ_API_KEY"], // This is the default and can be omitted
});

export async function GET(request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each questions should be seperated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensiive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? ||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, faster curiosity, and contribute to a positive and welcoming conversational environment. Just give  me the questions. just give the 3 questions only not any statement like Here are the three open-ended questions etc.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "assistant", content: prompt }],
      model: "llama3-8b-8192",
    });

    const questions = chatCompletion.choices[0].message.content.split("||");

    return Response.json({
      success: true,
      message: "Successfull",
      questions,
    });
  } catch (error) {
    console.log(error);
  }
}
