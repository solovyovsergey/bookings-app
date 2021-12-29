import useFetch from "../../hooks/useFetch";
import { User } from "../../types";
import { Spinner } from "../UI/Spinner";

type UserDetailsProps = {
  user: User | null;
  setUser: (val: User) => void;
};

export const UsersList = ({ user, setUser }: UserDetailsProps) => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useFetch<User[]>("http://localhost:3001/users");

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
