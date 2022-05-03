import { useState } from 'react';
import data from '../../static';
const { users } = data;

export default function UsersList() {
  const [userIndex, setUserIndex] = useState(1);

  function changeUser(selectedIndex) {
    setUserIndex(selectedIndex);
    console.log(selectedIndex);
  }

  return (
    <ul className="user items-list-nav">
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
  );
}
