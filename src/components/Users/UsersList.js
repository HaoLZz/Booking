import Spinner from '../UI/Spinner';
import useFetch from '../utils/useFetch';

export default function UsersList({ user, setUser }) {
  const {
    data: users = [],
    status,
    error,
  } = useFetch('http://localhost:3001/users');

  function changeUser(selectedUser) {
    setUser(selectedUser);
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
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
