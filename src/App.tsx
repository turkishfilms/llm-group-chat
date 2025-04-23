import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import ChatPage from "@/pages/chat";
import { ChatProvider, useChatContext } from "./context/ChatContext";

// Protected router component that checks for authentication
function ProtectedRouter() {
  const { currentUser } = useChatContext();

  return (
    <Switch>
      <Route path="/">
        {currentUser ? <ChatPage /> : <AuthPage />}
      </Route>
      <Route path="/auth">
        {currentUser ? <ChatPage /> : <AuthPage />}
      </Route>
      <Route path="/:rest*">
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <TooltipProvider>
          <Toaster />
          <ProtectedRouter />
        </TooltipProvider>
      </ChatProvider>
    </QueryClientProvider>
  );
}

export default App;
