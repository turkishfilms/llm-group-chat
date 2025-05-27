import React, { useEffect, useState } from "react";

const ChatroomIdList = ({ setChatroomId }) => {
  const [chatroomIds, setChatroomIds] = useState([]);

  useEffect(() => {
    fetch("/uniqueChatroomIds")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setChatroomIds(data.chatroomIds || []);
      })
      .catch((err) => {
        console.error("Error fetching chatroom IDs:", err);
        setChatroomIds([]); // Fallback to empty array
      });
  }, []);

  return (
    <div className="bg-zinc-700 p-4 mt-8 w-full max-w-sm max-h-[50vh] overflow-y-auto">
      <h2 className="text-center font-bold text-lg text-white mb-4">
        Active Chatroom Id's
      </h2>

      {chatroomIds.length > 0 ? (
        <ul className="space-y-2">
          {chatroomIds.map((id, index) => (
            <li
              key={index}
              className="cursor-pointer text-center py-2 px-2 bg-zinc-800 rounded-md text-gray-300 hover:bg-zinc-600 transition-colors"
              onClick={() => setChatroomId(id)}
            >
              {id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">
          Failed to load any chatrooms
        </p>
      )}
    </div>
  );
};

export default ChatroomIdList;
