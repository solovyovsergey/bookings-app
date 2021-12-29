import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../types";
import { getData } from "../../utils/api";
import { Spinner } from "../UI/Spinner";
import { useUser } from "./UserContext";

export default function UserPicker() {
  // TODO add loading
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useUser();

  useEffect(() => {
    getData<User[]>("http://localhost:3001/users")
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
        setUser(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID) || null;
    setUser(selectedUser);
  };

  if (isLoading) return <Spinner />;

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
