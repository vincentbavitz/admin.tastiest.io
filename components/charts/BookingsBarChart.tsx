import { IBooking } from '@tastiest-io/tastiest-utils';
import BarChart from './BarChart';

const ONE_DAY_IN_MS = 86400000;

interface Props {
  bookings: IBooking[];
}

export default function BookingsBarChart({ bookings }: Props) {
  const bookingHistory =
    bookings?.map(booking => ({
      bookings: booking.heads,
      timestamp: booking.paidAt,
    })) ?? [];

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTodayTimestamp = startOfToday.getTime();

  const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

  // Day of the week corresponds to Date.getDay() numerals;
  // where Sunday = 0 and Saturday = 6.
  const pastSevenDays = [
    startOfTodayTimestamp - 6 * ONE_DAY_IN_MS,
    startOfTodayTimestamp - 5 * ONE_DAY_IN_MS,
    startOfTodayTimestamp - 4 * ONE_DAY_IN_MS,
    startOfTodayTimestamp - 3 * ONE_DAY_IN_MS,
    startOfTodayTimestamp - 2 * ONE_DAY_IN_MS,
    startOfTodayTimestamp - ONE_DAY_IN_MS,
    startOfTodayTimestamp,
  ];

  // Get bookings for each day of the week
  const bookingsOverPastSevenDays = pastSevenDays.map(timestamp => {
    // First, let's just do today.
    let bookingsForThisDay = 0;
    const dayName = daysOfTheWeek[new Date(timestamp).getDay()];

    bookingHistory.forEach(bookingRecord => {
      if (
        bookingRecord.timestamp >= timestamp &&
        bookingRecord.timestamp < timestamp + ONE_DAY_IN_MS
      ) {
        bookingsForThisDay += bookingRecord.bookings;
      }
    });

    return { day: dayName, bookings: bookingsForThisDay };
  });

  const totalBookings = bookingsOverPastSevenDays.reduce(
    (a, b) => a + b.bookings,
    0,
  );

  return (
    <div className="flex flex-col h-full px-2 py-4 bg-white rounded-xl">
      <h4 className="px-4 pb-2 text-xl text-primary">
        {totalBookings} <span className="text-sm">bookings</span>
      </h4>

      <div className="relative flex flex-grow w-full">
        <BarChart
          data={bookingsOverPastSevenDays}
          indexBy="day"
          keys={['bookings']}
        />
      </div>
    </div>
  );
}
