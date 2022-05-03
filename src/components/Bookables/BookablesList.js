import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import data from '../../static';
const { bookables } = data;

export default function BookablesList() {
  // Set the group of bookables to be shown.
  const group = 'Rooms';
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1);

  function nextBookable() {
    // Passing th updater function a function when the new state depends on the previous state
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  return (
    <div>
      <select></select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => {
          return (
            <li key={b.id} className={i === bookableIndex ? 'selected' : null}>
              <button className="btn" onClick={() => setBookableIndex(i)}>
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
