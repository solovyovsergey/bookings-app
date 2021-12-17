import { useEffect, useState } from "react";
import { User } from "../../types";
import { getData } from "../../utils/api";
import { Spinner } from "../UI/Spinner";

export default function UserPicker() {
  // TODO add loading
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
