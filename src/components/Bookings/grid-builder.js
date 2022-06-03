import data from '../../static.json';
import { addDays, shortISO } from '../../utils/date-wrangler';
const sessionNames = data.sessions;

// Generating a grid with given bookable and starting date
export function getGrid(bookable, startDate) {
  const dates = bookable.days.sort().map((d) => {
    const date = shortISO(addDays(startDate, d));
    console.log(d, date);
    return date;
  });

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

// Transform data (an array of bookings) fetched from API into nested object structure suitable for generating a grid
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
