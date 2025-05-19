LLM Group Chat (Prototype)
Overview
This is a real-time chat application where users talk freely in a shared space while an AI language model observes and only responds under specific conditions. The system emphasizes open conversation and thoughtful, minimal AI intervention.

Core Features
LLM-Mediated Chatroom: Users can chat without interruption. The AI only responds when predefined conditions are met.

AI Role Control: Users define the AI's behavior and rules through three editable fields:

Personality: Tells the LLM what role to play.

Response Conditions: Logical string that controls when the AI is allowed to speak.

Talkativeness: Cooldown in seconds between being able to speak again



How It Works
Users join a chatroom by entering a username and chatroom id.

They can then add an LLMAgent to the chatroom with the LLMAgent menu, adjusting settings as needed.


After each message:

The backend logs the raw message.

The LLM is queried with recent chat context, personality, and response conditions (if agent not in cooldown).

If the conditions are satisfied, it responds. If not, it stays silent.



Tech Stack

Frontend=React
Backend=Node.js, Express
Database=MongoDB
LLM Integration=Groq API

Development Status
✅ Real-time chat

✅ AI response logic with conditions

✅ Editable AI behavior in UI

❌ No summarization or memory layers in this prototype

