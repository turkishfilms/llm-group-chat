function formatChatlog(chat) {
  return chat.map((entry) => `${entry.username}: ${entry.message}`).join("\n");
}

const getLLMResponse = async (data) => {
  const {
    name,
    personality,
    chatlog,
    model,
    temperature = 1,
    max_tokens = 1024,
    top_p = 1,
    stop = null,
  } = data;
  console.log("getLLMResponse called for: ", name);
  // Use last 15 messages to reduce token usage
  const limitedChatlog = chatlog.slice(-15);
  const formattedChatlog = formatChatlog(limitedChatlog);

  console.log(formatChatlog);

  // Try to get last message sent by the agent
  const lastAgentMessage = [...chatlog]
    .reverse()
    .find((msg) => msg.username === name);

  const lastMsgText = lastAgentMessage
    ? `"${lastAgentMessage.message}"`
    : "N/A";

  const prompt = `
You are ${name}, an AI character with the following personality traits: "${personality}".

Your purpose is to participate in the conversation only if you can add something meaningful, interesting, or in-character.

(This is the most recent conversation. Do not respond to stale or irrelevant parts of the log.)

---

Context:
Here is the recent conversation between multiple participants:
${formattedChatlog}

The last thing you said was:
"${lastMsgText}"

---

Instructions:
- Think carefully about the full context.
- Imagine how your personality would naturally respond to the last few lines.
- Keep your response concise — aim for less than 500 characters or a natural length.
- Only reply if your contribution moves the conversation forward, adds insight, humor, curiosity, or emotion consistent with your personality.
- Your output should be **only the response text**, with no extra commentary, explanation, quotes, or formatting.
- If you have no strong, interesting, or appropriate response, respond with exactly:
  No response needed

`.trim();

  const payload = {
    messages: [{ role: "user", content: prompt }],
    model,
    temperature,
    max_tokens,
    top_p,
    stop,
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_CLOUD_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const responseText = await response.text();
    const jsonResponse = JSON.parse(responseText);

    const aiReply =
      jsonResponse?.choices?.[0]?.message?.content || "No response needed";

    return aiReply;
  } catch (error) {
    console.error("LLM fetch error:", error);
    throw error;
  }
};

module.exports = getLLMResponse;
