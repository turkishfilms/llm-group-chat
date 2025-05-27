import React, { useState } from "react";

const CreateLLMAgent = ({ chatroomId, modelOptions, onCreated }) => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    active: true,
    personality: "",
    responseConditions: "",
    talkativeness: 10,
    model: modelOptions[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/createNewAgent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAgent, chatroomId }),
    })
      .then((res) => res.json())
      .then((data) => {
        onCreated(data.agent);
        setNewAgent({
          name: "",
          active: false,
          personality: "",
          responseConditions: "",
          talkativeness: 0,
          model: modelOptions[0],
        });
      })
      .catch((err) => console.error("Error creating agent:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 p-4 rounded mt-4">
      {["name", "personality"].map((field) => (
        <div key={field} className="mb-3">
          <label className="text-gray-300 text-sm capitalize">{field}</label>

          {field === "personality" ? (
            <textarea
              required
              className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
              rows={2}
              value={newAgent.personality}
              onChange={(e) =>
                setNewAgent({ ...newAgent, personality: e.target.value })
              }
            />
          ) : (
            <input
              required
              className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
              type="text"
              value={newAgent[field]}
              onChange={(e) =>
                setNewAgent({ ...newAgent, [field]: e.target.value })
              }
            />
          )}
        </div>
      ))}

      <div className="mb-3">
        <label className="text-gray-300 text-sm">Response Conditions</label>
        <textarea
          className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
          rows={1}
          placeholder="(Optional)ex.. last message has @name"
          value={newAgent.responseConditions}
          onChange={(e) =>
            setNewAgent({ ...newAgent, responseConditions: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="text-gray-300 text-sm capitalize">Model</label>
        <select
          required
          className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
          value={newAgent.model}
          onChange={(e) => setNewAgent({ ...newAgent, model: e.target.value })}
        >
          {modelOptions.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="text-gray-300 text-sm">Talkativeness</label>
        <input
          required
          className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
          type="number"
          value={newAgent.talkativeness}
          onChange={(e) =>
            setNewAgent({
              ...newAgent,
              talkativeness: parseInt(e.target.value),
            })
          }
        />
        <h5 className="text-gray-400 text-xs mt-1">
          Cooldown between messages in seconds
        </h5>
      </div>

      <div className="mb-3">
        <label className="text-gray-300 text-sm">Active</label>
        <input
          type="checkbox"
          className="ml-2"
          checked={newAgent.active}
          onChange={(e) =>
            setNewAgent({ ...newAgent, active: e.target.checked })
          }
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2 w-full"
      >
        Create Agent
      </button>
    </form>
  );
};

export default CreateLLMAgent;
