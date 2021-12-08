import { useEffect, useState } from "react";
import { User } from "../../types";
import { Spinner } from "../UI/Spinner";

export default function UserPicker() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  if (users === null) return <Spinner />;

  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
