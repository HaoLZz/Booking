import { parseDateString } from '../utils/date-wrangler';

export default function Booking({ booking, bookable }) {
  const { title, date, session, notes } = booking;

  return (
    <div className="booking-details-fields">
      <label>Title</label>
      <p>{title}</p>

      <label>Bookable</label>
      <p>{bookable.title}</p>

      <label>Booking Date</label>
      <p>{parseDateString(date).toDateString()}</p>

      <label>Session</label>
      <p>{session}</p>

      {notes && (
        <>
          <label>Notes</label>
          <p>{notes}</p>
        </>
      )}
    </div>
  );
}
