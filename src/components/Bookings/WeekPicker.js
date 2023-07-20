import { useRef } from 'react';
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from 'react-icons/fa';
import { useBookingsParams } from './bookingsHooks';
import { shortISO, addDays } from '../../utils/date-wrangler';

export default function WeekPicker() {
  const textboxRef = useRef();

  const { date, setBookingsDate: goToDate } = useBookingsParams();

  const dates = {
    prev: shortISO(addDays(date, -7)),
    next: shortISO(addDays(date, 7)),
    today: shortISO(new Date()),
  };

  console.log(dates);

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => goToDate(dates.prev)}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => goToDate(dates.today)}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            ref={textboxRef}
            placeholder="e.g. 2023-07-02"
            id="wpDate"
            defaultValue="2023-07-15"
          />
          <button
            className="go btn"
            onClick={() => goToDate(textboxRef.current.value)}
          >
            <FaCalendarCheck /> <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => goToDate(dates.next)}>
          <FaChevronRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
