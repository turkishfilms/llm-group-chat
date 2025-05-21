import React, { useEffect, useState } from "react";
import CreateLLMAgent from "./CreateLLMAgent";
import EditLLMAgent from "./EditLLMAgent";

const modelOptions = ["llama-3.1-8b-instant"];

const LLMAgentMenu = ({ chatroomId }) => {
  const [agents, setAgents] = useState([]);
  const [newAgentFormVisible, setNewAgentFormVisible] = useState(false);

  useEffect(() => {
    if (chatroomId) {
      fetch(`/agentsByChatroomId/${chatroomId}`)
        .then((res) => res.json())
        .then((data) => setAgents(data.agents))
        .catch((err) => console.error("Error fetching agents:", err));
    }
  }, [chatroomId]);

  const handleFieldEdit = (id, field, value) => {
    fetch("/editAgent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAgents((prev) =>
          prev.map((agent) => (agent._id === id ? data.agent : agent))
        );
      })
      .catch((err) => console.error("Error editing agent:", err));
  };

  const handleNewAgent = (agent) => {
    setAgents((prev) => [...prev, agent]);
    setNewAgentFormVisible(false);
  };

  return (
    <div className="bg-zinc-700 p-4 mt-8 w-full max-w-md max-h-[70vh] overflow-y-auto rounded shadow">
      <h2 className="text-white text-lg font-semibold mb-4 text-center">
        Agent in Room {chatroomId}
      </h2>

      {agents.length > 0 ? (
        agents.map((agent) => (
          <EditLLMAgent
            key={agent._id}
            agent={agent}
            modelOptions={modelOptions}
            handleFieldEdit={handleFieldEdit}
          />
        ))
      ) : (
        <div className="text-center text-gray-300 mb-4">
          No agent found in this room.
        </div>
      )}

      {agents.length === 0 && !newAgentFormVisible && (
        <div className="flex justify-center">
          <button
            onClick={() => setNewAgentFormVisible(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Agent
          </button>
        </div>
      )}

      {newAgentFormVisible && (
        <CreateLLMAgent
          chatroomId={chatroomId}
          modelOptions={modelOptions}
          onCreated={handleNewAgent}
        />
      )}
    </div>
  );
};

export default LLMAgentMenu;
