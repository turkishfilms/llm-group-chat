function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffleArray(array) {
  const arr = array.slice(); // copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const {
  getMessagesByChatroom,
  saveNewMessage,
  getAgentsByRoomId,
} = require("../db/handler");

const getLLMResponse = require("./llmResponse");

function cooldownReady(agent, lastAgentMessageTimestamp) {
  const cooldownMs = (agent.talkativeness || 0) * 1000;
  const lastTimestamp = new Date(lastAgentMessageTimestamp).getTime();

  if (isNaN(lastTimestamp)) {
    return true;
  }

  return Date.now() - lastTimestamp >= cooldownMs;
}

async function maybeTriggerAgent(agent, message, totalAgents) {
  const rand = Math.random();
  const chance = 1 / totalAgents;

  //if (rand >= chance) return; UNCOMMENT THIS OUT FOR LLMS TO BURN OUT INSTEAD OF LOOPING

  const chatLog = await getMessagesByChatroom(message.chatroomId);
  if (chatLog.length === 0) return;

  const lastMsg = chatLog[chatLog.length - 1];
  if (lastMsg.sender_id?.equals(agent._id)) {
    return;
  }

  const lastAgentMessage = [...chatLog]
    .reverse()
    .find((msg) => msg.sender_id?.equals(agent._id));

  if (lastAgentMessage && !cooldownReady(agent, lastAgentMessage.timestamp))
    return;

  const aiReply = await getLLMResponse({
    name: agent.name,
    personality: agent.personality,
    responseConditions: agent.responseConditions,
    chatlog: chatLog,
    model: agent.model || "llama-3.1-8b-instant",
  });

  if (aiReply && aiReply.trim() !== "No response needed") {
    const newAIMessage = await saveNewMessage({
      chatroomId: message.chatroomId,
      username: agent.name,
      message: aiReply,
      timestamp: Date.now(),
      sender_id: agent._id,
    });

    // Now trigger agents with the new AI message
    await runLLMAgentTriggers(newAIMessage);
  }
}

async function runLLMAgentTriggers(message) {
  const agents = await getAgentsByRoomId(message.chatroomId);
  const activeAgents = shuffleArray(agents.filter((agent) => agent.active));
  const total = activeAgents.length;

  for (const agent of activeAgents) {
    await sleep(7000); // timer between and before first response (gives it thinking time feel)
    await maybeTriggerAgent(agent, message, total);
  }
}

module.exports = {
  runLLMAgentTriggers,
};
