import data from '../../static.json';
import { addDays, shortISO } from '../utils/date-wrangler';
const sessionNames = data.sessions;

export function getGrid(bookable, startDate) {
  const dates = bookable.days
    .sort()
    .map((d) => shortISO(addDays(startDate, d)));

  const sessions = bookable.sessions.map((i) => sessionNames[i]);

  const grid = {};

  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach((date) => {
      grid[session][date] = {
        session,
        date,
        bookableId: bookable.id,
        title: '',
      };
    });
  });
  return {
    grid,
    dates,
    sessions,
  };
}

export function transformBookings(bookingArray) {
  return bookingArray.reduce((bookings, booking) => {
    const { session, date } = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }
    bookings[session][date] = booking;
    return bookings;
  }, {});
}
