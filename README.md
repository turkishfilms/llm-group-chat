# LLM Group Chat (Prototype)

## Overview
This is a real-time chat application where users can talk freely in a shared space while an AI language model observes and responds only under specific conditions. The system emphasizes open conversation with thoughtful, minimal AI intervention.

## Core Features
- **LLM-Mediated Chatroom**: Users can chat without interruption. The AI responds only when predefined conditions are met.
- **AI Role Control**: Users define the AI's behavior and rules through three editable fields:
  - **Personality**: Specifies the role the LLM should play.
  - **Response Conditions**: Logical string that controls when the AI is allowed to speak.
  - **Talkativeness**: Cooldown period (in seconds) between AI responses.

## How It Works
1. Users join a chatroom by entering a username and chatroom ID.
2. Users can add an LLMAgent to the chatroom via the LLMAgent menu, adjusting settings as needed.
3. After each message:
   - The backend logs the raw message.
   - The LLM is queried with recent chat context, personality, and response conditions (if the agent is not in cooldown).
   - If the conditions are satisfied, the AI responds. Otherwise, it remains silent.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **LLM Integration**: Groq API

## Development Status
- ✅ Real-time chat
- ✅ AI response logic with conditions
- ✅ Editable AI behavior in UI
- ❌ No summarization or memory layers in this prototype