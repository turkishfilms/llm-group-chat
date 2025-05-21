function formatChatlog(chat) {
  return chat.map((entry) => `${entry.username}: ${entry.message}`).join("\n");
}

const getLLMResponse = async (data) => {
  console.log("getLLMResponse called");
  const {
    personality,
    chatlog,
    model = "llama-3.1-8b-instant",
    temperature = 1,
    max_tokens = 1024,
    top_p = 1,
    stop = null,
  } = data;
  let formattedChatlog = formatChatlog(chatlog);
  console.log(formattedChatlog);
  const prompt = `You are username AI (with a need to ${personality}). Generate a response as AI if needed based off of this conversation. If you don't need to respond, then say back 'No response needed'.\n\n${formattedChatlog}`;

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
    console.log("AI Reply:", aiReply);

    return aiReply;
  } catch (error) {
    console.error("LLM fetch error:", error);
    throw error;
  }
};

module.exports = getLLMResponse;
