import { getWeek, parseDateString } from '../../utils/date-wrangler';

export default function reducer(state, action) {
  switch (action.type) {
    case 'NEXT_WEEK':
      return getWeek(state.date, 7);
    case 'PREV_WEEK':
      return getWeek(state.date, -7);
    case 'TODAY':
      return getWeek(new Date());
    case 'SET_DATE':
      return getWeek(parseDateString(action.payload));
    default:
      new Error(`Unknown action type: ${action.type}`);
  }
}
