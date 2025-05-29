

import 'dotenv/config';
import OpenAI from "openai";
import readline from "readline";

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user for input
rl.question("Enter your prompt: ", async (userPrompt) => {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userPrompt }
            ]
        });

        const assistantMessage = response.choices[0].message.content;
        const totalTokens = response.usage.total_tokens;

        console.log("\nAssistant's response:\n", assistantMessage);
        console.log("\nTotal tokens used:", totalTokens);
    } catch (err) {
        console.error("API call failed:", err);
    } finally {
        rl.close();
    }
});

