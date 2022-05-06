import { useState, useEffect } from 'react';
import PageSpinner from '../UI/PageSpinner';
import { getData } from '../utils/api';

export default function UsersList({ user, setUser }) {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData('http://localhost:3001/users')
      .then((users) => {
        setUser(users[0]);
        setIsLoading(false);
        setUsers(users);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [setUser]);

  function changeUser(selectedUser) {
    setUser(selectedUser);
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <ul className="users items-list-nav">
      {users.map((u) => {
        return (
          <li key={u.id} className={u.id === user.id ? 'selected' : null}>
            <button className="btn" onClick={() => changeUser(u)}>
              {u.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
