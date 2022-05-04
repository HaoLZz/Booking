import { useState, useEffect } from 'react';
import PageSpinner from '../UI/PageSpinner';
import getData from '../utils/api';

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userIndex, setUserIndex] = useState(1);
  const user = users ? users[userIndex] : null;

  useEffect(() => {
    getData('http://localhost:3001/users')
      .then((data) => {
        setIsLoading(false);
        setUsers(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  function changeUser(selectedIndex) {
    setUserIndex(selectedIndex);
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <ul className="users items-list-nav">
        {users.map((u, i) => {
          return (
            <li key={u.id} className={i === userIndex ? 'selected' : null}>
              <button className="btn" onClick={() => changeUser(i)}>
                {u.name}
              </button>
            </li>
          );
        })}
      </ul>
      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="item-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </>
  );
}
