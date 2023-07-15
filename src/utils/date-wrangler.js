export function isDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.valueOf());
  } catch (error) {
    return false;
  }
}

export function addDays(date, daysToAdd) {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

export function getWeek(forDate, daysOffset = 0) {
  const date = addDays(forDate, daysOffset);
  const day = date.getDay();

  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day),
  };
}

export function shortISO(date) {
  return date.toISOString().split('T')[0];
}

export function parseDateString(dateString) {
  const [YYYY, MM, DD] = dateString.split('-');
  return new Date(YYYY, MM - 1, DD);
}
