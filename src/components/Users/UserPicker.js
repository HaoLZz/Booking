import { useState, useEffect } from 'react';
import Spinner from '../UI/Spinner';

export default function UserPicker() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (users === null) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
}
