import { useState, Fragment, useEffect } from "react";
import { User } from "../../types";
import { getData } from "../../utils/api";
import { Spinner } from "../UI/Spinner";

type UserDetailsProps = {
  user: User | null;
  setUser: (val: User) => void;
};

export const UsersList = ({ user, setUser }: UserDetailsProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => {
        setUser(data[0]);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <ul className="users items-list-nav">
      {users.map((u) => (
        <li key={u.id} className={u.id === user?.id ? "selected" : undefined}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
