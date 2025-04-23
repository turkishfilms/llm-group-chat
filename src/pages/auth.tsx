import SignInForm from "@/components/SignInForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Chat Room</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to start chatting with others</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
