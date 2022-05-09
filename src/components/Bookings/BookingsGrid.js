import { useEffect, useMemo, useState } from 'react';
import { getGrid, transformBookings } from './grid-builder';
import { parseDateString } from '../utils/date-wrangler';

import { getBookings } from '../utils/api';

import Spinner from '../UI/Spinner';

export default function BookingsGrid({ week, bookable, booking, setBooking }) {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(false);

  const { grid, sessions, dates } = useMemo(
    () => (bookable ? getGrid(bookable, week.start) : {}),
    [bookable, week.start],
  );

  useEffect(() => {
    if (bookable) {
      let doUpdate = true;

      setBookings(null);
      setError(false);
      setBooking(null);

      getBookings(bookable.id, week.start, week.end)
        .then((res) => {
          if (doUpdate) {
            setBookings(transformBookings(res));
            console.log('data fetching succeses');
          }
        })
        .catch((e) => setError(e));
      // return a clean-up function to invalidate outdated fetch request
      return () => (doUpdate = false);
    }
  }, [week, bookable, setBooking]);

  function cell(session, date) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;
    return (
      <td
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={bookings ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {error && (
        <p className="bookingsError">
          {`There was a problem loadiing the bookings data (${error})`}
        </p>
      )}

      <table className={bookings ? 'bookingsGrid active' : 'bookingsGrid'}>
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{parseDateString(d).toDateString()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
