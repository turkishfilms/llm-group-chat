## System Development Workflow

Step 1: Define the Conceptual System
Core Purpose
[Describe the mission and value of the system]

Key Components & Roles
[List the major components and describe what each one does]

How Components Interact
[Diagram or notes on interactions between components]

Tech Stack
[Languages, libraries, and frameworks assigned per component]

Shared Vocabulary & Principles (optional)
[Define any important terms or philosophies that guide the build]

---

Step 2: Planning Phase
Break Down Components into Tasks
[List features and responsibilities for each component]

Assign Roles
[Who builds what?]

Define Interfaces
[Input/output expectations for each component]

---

Step 3: Build Phase (Iterative)
Individual Development
[Each person builds their assigned component]

Weekly Sync
[Discussion points, roadblocks, questions]

Integration-Ready Check
[Confirm components match interface agreements]

---

Step 4: Integration & System Assembly
Combine all components
Troubleshoot connection points
Test for basic functionality and data flow

---

Step 5: Testing & Refinement
Unit Testing
[Test individual components]

Integration Testing
[Test full system]

User Testing (if needed)
[Simulate real usage scenarios]

Refactor / Improve
[Simplify, optimize, clarify]

---

Step 6: Review & Reflect
What worked well?
What could be improved next time?
What reusable parts or patterns did we create?
Tabor AI Group LLM

---

Mission: To Unleash the Power Of LLMS on group chats to revolutionize Collaboration
Problem: Group collaboration is constrained by the participants
social skills.
Solution: Remove the constraint by utilizing LLMS.

Users:
Tech teams
Couples

Success:
Conversations periodically summarized.
Each indivivduals perspectives steelmanned.
Common ground explicitlty stated.
Points of tension articulated.
Facts Checked.
Recommendations for healthy communication shared.
Questions targetted towards exploration and resolution
offered.

MVP:
An anon group chat (no log in) keywords available to activate steelman,common
ground, fact check and summary LLM response.

~ Anon Group Chat
~ LLM user
~ Steelman
~ Common Ground
~ Fac Check
~ Summary

Components:
Basic Frontend
Backend
DB

Diagram:
DB <-> Backend <-> Frontend
/
LLM API

Tech Stack:
MERN + AWS Hosting

Roadmap:
v0.1.0 Anon ChatRoom
v0.1.1 DB
v0.2.0 LLM addition
v0.2.1 LLM Keyword Support
v0.2.2 LLM Keywords Added
v0.3.0 AWS Hosting

Features:
Online Group Chat
Group Chat UI
LLM API
LLM Keywords

Dev Ops:
Github Version Control
-- Main/fork Hierarchy. PR for development
GitHub for testing
Github for Roadmap
GitHub Task Management
Main Dev Ft/Bug branches
Comments using JSDOC or basically just Each Function/class
gets comments descibing in ad out type and general uses
Error Handling and type checking
Git Commits Follow:
"""
Description of change (Short, Imperative)

What changes were made
Why it was a good idea
How it was done (optional)
"""

Timeline:
Week 1: Local Anon Chat with Chats stored in memory + LLM API
Research + UI
Week 2: Local Anon Chat with Chats in DB + LLM API
Implementation
Week 3: LLM Resonds in Local Chat + Keyword Support framework
Week 4: Keywords Added and tested
Week 5: AWS infrastructure Researched and started
Week 6: Migration to AWS And Chat goes Online
Week 7: Feedback and evaluation
=====

Step 1: Define the Conceptual System

Core Purpose
This system is a chat application that lets users talk in a shared space, while an LLM (language model) observes and mediates when certain conditions are met. It’s designed to reduce AI interruption unless needed, while keeping the AI fully informed using a memory-efficient system of layered summarization. The goal is to balance open human conversation with thoughtful AI contribution, using minimal tokens to deliver maximum context.

Key Components & Roles
The system has three primary parts: the user interface, the LLM mediation logic, and the memory/compression engine.

Users enter the chatroom by simply typing in a name. Once inside, they can chat freely. Each message is saved in its raw form to the database and also immediately compressed using the LLM into a concise, context-preserving version. This happens for every message in real time.

As the chat continues, the system organizes compressed messages into a hierarchy. Every 100 messages, the most recent 80 are grouped and summarized into a “chunk” (Layer 2). Once there are more than five of these chunks, the oldest four are summarized again into a final, ultra-dense Layer 3 summary that encapsulates the global tone and direction of the conversation. This makes it possible to keep a long-term memory footprint without exceeding the LLM’s token limits. All of this is managed by the compressor component.

When a new message is sent, the LLM is queried. The request includes the Layer 3 summary (the overarching history), the most recent Layer 2 chunk (midterm memory), and a small set of recent Layer 1 summaries (short-term memory). The LLM also receives two user-defined fields: the “AI Description,” which tells it how to behave or what role to play, and the “Response Conditions,” which define when it is allowed to speak. The AI only responds if those conditions are satisfied. Otherwise, it returns, “I have nothing to say,” and the chat
and the chat continues without interruption.

This lets the AI feel like a respectful observer who only joins in when invited, but still has rich and layered knowledge of everything that has happened. It’s meant to feel like a helpful presence, not an intrusive one.

How Components Interact
When a user sends a message, several things happen at once. First, the message is saved to the raw chat log in the database. Next, the message is sent to the LLM for compression and stored as a Layer 1 summary. If enough messages have been sent (100), the system creates a new Layer 2 chunk from the last 80 summaries. Once five chunks exist, the first four are combined into a new Layer 3 summary, which captures the evolving arc of the whole conversation.

The LLM is called each time a message is sent. It receives a combined context package: the Layer 3 global summary, the most recent Layer 2 chunk, and a small buffer of recent Layer 1 summaries. The AI also receives the current “AI Description” and “Response Conditions.” Based on all of that, it generates a potential reply and then checks if it should say anything according to the user-defined rules. If yes, it responds; if not, it remains silent.

The AI’s behavior is live-editable through the description and condition fields in the UI. This allows it to behave differently in every conversation or to evolve in tone over time. Users can experiment with different mediation styles and interaction rules without changing the code.
Tech Stack
The frontend is built in React and provides a lightweight, real-time chat interface with a description/condition editor for the AI’s role. Users log in with just a name—no password required at this stage—and can begin chatting immediately.

The backend is built with Node.js, Express, and WebSockets for real-time messaging. MongoDB handles data storage. There are two main database collections: the full raw chat log and the multi-layered summarization system. The system also integrates with an LLM API for both message compression and AI response generation.

Each message record includes the sender’s name, contents, and ID. The summarization system stores Layer 1 compressed messages, Layer 2 summary chunks, and a single Layer 3 global summary. Each summarized message stores who sent it and the compressed content.

This stack is intentionally minimal and fast, designed for quick iteration and real-timeAI-assisted dialogue without the weight of traditional authentication or excessive backend logic.

Keywords

Language compressor, layer 1 summation, layer 2, layer 3

chatLog- raw chat for user reference

summatedChatLog - made of the summated layers by the fompressor()for llm context

Summarization and compression are kind of mixed in here, but same thing. The compressor component is what handles summating current message with llm query, and previous layers when needed with further llm queries.
Red = new chat processes
Orange = getting chat log
Green = compressing chats
Blue= sending summarized chat+ description to llm for new chat response from llm
Image
This is why I thought of the 3 layers instead of just 1 summary and messages. I typed in own words but this is way more clear . and the numbers I chose earlier are random and need to be explored but it was a general figure to give idea

Layer 1: Message-level Abstraction (Micro-Summaries)
• Each individual message is converted into a short phrase or sentence that captures its core meaning.
• This keeps the full context, but compresses the content, making it more lightweight.
• Instead of storing the entire raw message, you store a condensed version.
• This is helpful when messages are very long or detailed — it trims the fat but retains meaning.

Why it matters: When you’re dealing with hundreds of long messages, you don’t want to pass them all raw into an LLM. This layer is like “lossless compression” that makes step 2 manageable and lowers amount of tokens sent to llm. Raw messages are only for users. All messages sent to llm are st least layer 1 summarized.

⸻

Layer 2: Chunk-level Summary (Meso-Summaries)
• A group of Layer 1 summaries (e.g., every 20-50 messages) are chunked together and summarized into a paragraph or a few lines.
• This creates partial summaries that are still detailed but now refer to a whole section of conversation instead of one message.
• Crucially, each chunk is versioned — meaning you can track changes or update a specific chunk without messing up the rest.

Why it matters: You avoid the trap of re-summarizing the entire conversation every time something new is added. You can just update the affected chunk.

⸻
Layer 3: Global Summary (Macro-Summary)
• The summaries from Layer 2 are then combined into a single high-level summary that gives a clean and readable overview of the entire conversation.
• Because it’s built from manageable chunks, this summary can be updated fluidly as the chat grows — without having to start over every time.

Why it matters: Trying to summarize 1,000 messages in one shot is messy and error-prone. This layer gives you a dynamic and accurate overview that evolves with the conversation.

⸻

Why the 3-Layer Model Is Smart
• It scales well with long chats.
• It keeps accuracy high, because each summary is built from more manageable and trackable units.
• It allows versioning — so if one chunk changes, you don’t have to redo everything.
• It supports fluid updates, making it easier for an LLM to work within token limits.
I agree about the scaling issue. I think we should do raw charts door demo as you suggested. It’s fundamentally solving a future problem. Let’s cross bridges when we get to them. We don’t have big chats yet, we don’t even have a chat room yet. As long as we keep the components modular we would only have to add one line.
Instead of

const llmResponses = llmHandler.respond(rawMessages)

It becomes

const compressedMessages = compressor.compress(rawMessages)

const llmResponses = llmHandler.respond(compressedMessages)
My point is I don’t want to build complexity in from the start or even constrain ourselves in unnecessary ways. I totally see your future token limit concern. I’m happy to solve that problem with you and support your solution to that problem when we get there
Image
Components needed for test run: front end chat room

Express server
-post chat
-get chats
-llm response
-mongoose db saving and pulling
T... — 8:19 PM
Server will speak to a chat room handler. Chatroom h alder has a fixed server side interface. This makes the server chatroom agnostic. Enabling future third party chat room integration seamlessly.
Our chatroom is one possible chat that will plug in to our server via this handler.
Image
Tabor — 8:26 PM
get (chatroom id) -
array of chats. id starts at 0 with first message
[(id, user, content), ]
T... — 8:27 PM
Client has two things it says to the server. Sendchat. Getchats
Tabor — 8:28 PM
express server needs to be able to identify which chatroom chat came from to assign approproate chatroomid
post (chatroom id, newchat)
new chat = id, user, content
T... — 8:29 PM
{cID, body, cUser}
Tabor — 8:31 PM
client needs from server:
get (chatroom id) -
array of chats. id starts at 0 with first message
[(id, user, content), ]
server needs from client:
be able to accept post (chatroom id, newchat)
