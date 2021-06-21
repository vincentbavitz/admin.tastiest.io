import { IBooking } from '@tastiest-io/tastiest-utils';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import BarChart from './BarChart';

const ONE_DAY_IN_MS = 86400000;

interface Props {
  restaurantId: string;
}

export default function TimelineBarChart({ restaurantId }: Props) {
  const { data: bookings } = useSWR<IBooking[]>(LocalEndpoint.GET_USERS, {
    refreshInterval: 5000,
    initialData: null,
    refreshWhenHidden: true,
    compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  });

  const coverHistory =
    bookings?.map(booking => ({
      covers: booking.heads,
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

  // Get covers for each day of the week
  const coversOverPastSevenDays = pastSevenDays.map(timestamp => {
    // First, let's just do today.
    let coversForThisDay = 0;
    const dayName = daysOfTheWeek[new Date(timestamp).getDay()];

    coverHistory.forEach(coverRecord => {
      if (
        coverRecord.timestamp >= timestamp &&
        coverRecord.timestamp < timestamp + ONE_DAY_IN_MS
      ) {
        coversForThisDay += coverRecord.covers;
      }
    });

    return { day: dayName, covers: coversForThisDay };
  });

  const totalCovers = coversOverPastSevenDays.reduce((a, b) => a + b.covers, 0);

  return (
    <div className="px-2 py-4 bg-white rounded-xl">
      <h4 className="px-4 text-xl text-primary">
        {totalCovers} <span className="text-sm">covers</span>
      </h4>

      <div className="relative w-full aspect-w-16 aspect-h-7">
        <BarChart
          data={coversOverPastSevenDays}
          indexBy="day"
          keys={['covers']}
        />
      </div>
    </div>
  );
}
