import { shortISO } from './date-wrangler';

export function getData(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw Error('Error in fetching data!');
    }

    return res.json();
  });
}

export function getBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = 'https://my-json-server.typicode.com/HaoLZz/Booking/bookings';
  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

  return getData(`${urlRoot}?${query}`);
}
