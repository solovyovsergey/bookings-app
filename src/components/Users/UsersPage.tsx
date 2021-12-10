import { useState } from "react";
import { User } from "../../types";
import { UserDetails } from "./UserDetails";
import { UsersList } from "./UsersList";

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <main className="users-page">
      <UsersList user={user} setUser={setUser} />
      <UserDetails user={user} />
    </main>
  );
}
