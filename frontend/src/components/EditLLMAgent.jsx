import React from "react";

const EditLLMAgent = ({ agent, modelOptions, handleFieldEdit }) => {
  return (
    <div className="bg-zinc-800 p-3 mb-3 rounded">
      {["name", "personality", "talkativeness", "model", "active"].map(
        (field) => (
          <div key={field} className="mb-2">
            <label className="text-gray-300 text-sm">{field}</label>
            {field === "model" ? (
              <select
                className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
                value={agent.model}
                onChange={(e) =>
                  handleFieldEdit(agent._id, "model", e.target.value)
                }
              >
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="w-full bg-zinc-900 text-white p-1 rounded mt-1"
                type={
                  field === "talkativeness"
                    ? "number"
                    : field === "active"
                    ? "checkbox"
                    : "text"
                }
                value={field === "active" ? undefined : agent[field] ?? ""}
                checked={field === "active" ? Boolean(agent[field]) : undefined}
                onChange={(e) => {
                  const value =
                    field === "talkativeness"
                      ? parseInt(e.target.value)
                      : field === "active"
                      ? e.target.checked
                      : e.target.value;
                  handleFieldEdit(agent._id, field, value);
                }}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default EditLLMAgent;
