import { useEffect } from 'react';
import { useUser } from './UserContext';
import useFetch from '../../utils/useFetch';
import Spinner from '../UI/Spinner';

export default function UserPicker() {
  const { data: users = [] } = useFetch('http://localhost:3001/users');
  const [user, setUser] = useUser();

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedID);

    setUser(selectedUser);
  }

  if (users.length === 0) {
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
