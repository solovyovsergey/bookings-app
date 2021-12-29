import { ChangeEvent, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types";
import { Spinner } from "../UI/Spinner";
import { useUser } from "./UserContext";

export default function UserPicker() {
  const [user, setUser] = useUser();

  const {
    data: users = [],
    isLoading,
    error,
  } = useFetch<User[]>("http://localhost:3001/users");

  useEffect(() => {
    // if users is [], setUser(undefined). Why doesn't TS show errors?
    setUser(users[0] || null);
  }, [users, setUser]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID) || null;
    setUser(selectedUser);
  };

  if (isLoading) return <Spinner />;
  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <select className="user-picker" onChange={handleSelect} value={user?.id}>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
