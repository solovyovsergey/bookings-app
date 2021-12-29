import { useState } from "react";
import { User } from "../../types";
import { useUser } from "./UserContext";
import { UserDetails } from "./UserDetails";
import { UsersList } from "./UsersList";

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null);

  const [loggedInUser] = useUser();

  const currentUser = user || loggedInUser;

  // pass currentUser to children
  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
}
