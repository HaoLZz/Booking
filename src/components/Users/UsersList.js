import { useState } from 'react';
import data from '../../static';
const { users } = data;

export default function UsersList() {
  const [userIndex, setUserIndex] = useState(1);
  const user = users[userIndex];

  function changeUser(selectedIndex) {
    setUserIndex(selectedIndex);
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
