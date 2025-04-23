import { User } from "@shared/schema";

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
    <div className="p-4">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Online Users</h2>
      
      <ul className="mt-3 space-y-1">
        {users.map((user) => (
          <li key={user.id} className="flex items-center px-2 py-2 rounded-md hover:bg-slate-50">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm font-medium text-slate-700">{user.displayName}</span>
          </li>
        ))}
        {users.length === 0 && (
          <li className="px-2 py-2 text-sm text-slate-500">No users online</li>
        )}
      </ul>
    </div>
  );
}
