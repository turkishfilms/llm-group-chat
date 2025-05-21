const {
  getAgentsByRoomId,
  createNewAgent,
  updateAgentById,
} = require("../db/handler");

const getAgents = async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const agents = await getAgentsByRoomId(chatroomId);
    res.status(200).json({ agents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
const postNewAgent = async (req, res) => {
  try {
    const { chatroomId, name, active, personality, talkativeness, model } =
      req.body;

    if (
      !chatroomId ||
      !name ||
      active == null ||
      !personality ||
      talkativeness == null ||
      !model
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields for agent" });
    }

    const newAgent = await createNewAgent({
      chatroomId,
      name,
      active,
      personality,
      talkativeness,
      model,
    });

    res.status(201).json({ message: "Agent created", agent: newAgent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const editAgent = async (req, res) => {
  try {
    const { id, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing agent ID" });
    }

    const updatedAgent = await updateAgentById(id, updates);

    if (!updatedAgent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.status(200).json({ message: "Agent updated", agent: updatedAgent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAgents,
  postNewAgent,
  editAgent,
};
