import { motion } from 'framer-motion'
export default function MessageBubble({ username, author, text }) {
  const isYou = author === username; //fix this
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -10 }}
      transition={{ duration: 0.2 }}
      className={`max-w-[80%] px-4 py-2 rounded-2xl shadow ${isYou
        ? "self-end bg-blue-600 text-white"
        : "self-start bg-gray-800 text-gray-100"
        }`}
    >
      {`${author}: ${text}`}
    </motion.div>
  );
}
