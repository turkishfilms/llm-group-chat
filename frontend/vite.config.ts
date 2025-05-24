import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/newMessage': 'http://localhost:3000',
      '/chatMessages': 'http://localhost:3000',
      '/uniqueChatroomIds': 'http://localhost:3000',
      '/agentsByChatroomId': 'http://localhost:3000',
      '/createNewAgent': 'http://localhost:3000',
      '/editAgent': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
