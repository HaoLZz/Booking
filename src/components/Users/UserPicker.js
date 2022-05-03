import data from '../../static';

const { users } = data;

export default function UserPicker() {
  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
}
