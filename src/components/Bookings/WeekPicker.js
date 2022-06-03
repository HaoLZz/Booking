import { useState } from 'react';
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from 'react-icons/fa';

import { shortISO } from '../../utils/date-wrangler';

export default function WeekPicker({ dispatch, week }) {
  const initialDateText = shortISO(week.date);
  const [dateText, setDateText] = useState(initialDateText);

  function goToDate() {
    dispatch({ type: 'SET_DATE', payload: dateText });
  }

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: 'PREV_WEEK' })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: 'TODAY' })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            placeholder="e.g. 2022-05-04"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />
          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck /> <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: 'NEXT_WEEK' })}>
          <FaChevronRight />
          <span>Next</span>
        </button>
      </p>
      {/* <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p> */}
    </div>
  );
}
