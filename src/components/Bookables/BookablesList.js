import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useFetch from '../../utils/useFetch';
import Spinner from '../UI/Spinner';

export default function BookablesList({ bookable, setBookable }) {
  const {
    data: bookables = [],
    status,
    error,
  } = useFetch('https://my-json-server.typicode.com/HaoLZz/Booking/bookables');

  // Set the group of bookables to be shown.
  const group = bookable?.group;
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  useEffect(() => {
    setBookable(bookables[0]);
  }, [bookables, setBookable]);

  function changeGroup(e) {
    const bookablesInGroup = bookables.filter(
      (b) => b.group === e.target.value,
    );
    setBookable(bookablesInGroup[0]);
  }

  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
  }

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b) => {
          return (
            <li key={b.id} className={b.id === bookable.id ? 'selected' : null}>
              <button className="btn" onClick={() => changeBookable(b)}>
                {b.title}
              </button>
            </li>
          );
        })}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
