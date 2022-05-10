import { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import Spinner from '../UI/Spinner';

export default function UserPicker() {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      setUsers(data);
      setUser(data[0]);
    };
    fetchUsers();
  }, [setUser]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID);

    setUser(selectedUser);
  }

  if (users === null) {
    return <Spinner />;
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
