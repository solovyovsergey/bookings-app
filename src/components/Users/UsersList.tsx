import { useState, Fragment, useEffect } from "react";
import { User } from "../../types";
import { getData } from "../../utils/api";
import { Spinner } from "../UI/Spinner";

export default function UsersList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex];

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  if (users === null) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={i === userIndex ? "selected" : undefined}>
            <button className="btn" onClick={() => setUserIndex(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
