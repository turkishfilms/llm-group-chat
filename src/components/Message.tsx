import { ChatMessage } from "@/context/ChatContext";
import { formatTime, getAvatarColor } from "@/lib/utils";

interface MessageProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export default function Message({ message, isCurrentUser }: MessageProps) {
  const { text, timestamp, user } = message;
  const time = formatTime(timestamp);
  const avatarClass = isCurrentUser ? 'avatar-color-0' : `avatar-color-${getAvatarColor(user.username)}`;

  if (isCurrentUser) {
    return (
      <div className="flex items-start justify-end">
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <span className="mr-2 text-xs text-slate-500">{time}</span>
            <span className="font-medium text-sm text-slate-900">You</span>
          </div>
          <div className="mt-1 bg-primary-600 px-4 py-2 rounded-lg rounded-tr-none shadow-sm max-w-md">
            <p className="text-sm text-white">{text}</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <div className={`user-avatar ${avatarClass}`}>
            {user.initials}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3">
        <div className={`user-avatar ${avatarClass}`}>
          {user.initials}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium text-sm text-slate-900">{user.displayName}</span>
          <span className="ml-2 text-xs text-slate-500">{time}</span>
        </div>
        <div className="mt-1 bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm max-w-md">
          <p className="text-sm text-slate-700">{text}</p>
        </div>
      </div>
    </div>
  );
}
