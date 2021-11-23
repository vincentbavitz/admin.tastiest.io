import { Button } from '@tastiest-io/tastiest-ui';
import {
  humanTimeIntoMins,
  minsIntoHumanTime,
  TIME,
} from '@tastiest-io/tastiest-utils';
import { TimeRange } from '@tastiest-io/tastiest-utils/dist/types/time';
import React, { useContext } from 'react';
import { RangeSlider } from 'rsuite';
import {
  BookingSlotsContext,
  BookingSlotsSelectorSteps,
} from './BookingSlotsContext';

export const BookingSlotsSelectorHoursSection = () => {
  const { openTimesMetric, setStep } = useContext(BookingSlotsContext);

  return (
    <>
      <div className="">
        <h4 className="pb-6 text-base font-medium leading-tight text-center">
          Select your open hours for each day.
        </h4>

        <div className="flex flex-col space-y-8">
          {openTimesMetric.map((day, index) =>
            day.open ? <HoursSelector key={index} numeral={index} /> : null,
          )}
        </div>
      </div>

      <div className="flex justify-center pt-6 space-x-2">
        <Button
          color="neutral"
          onClick={() => setStep(BookingSlotsSelectorSteps.DAYS)}
        >
          Back
        </Button>
        <Button onClick={() => setStep(BookingSlotsSelectorSteps.SLOTS)}>
          Next
        </Button>
      </div>
    </>
  );
};

interface HoursSelectorProps {
  numeral: number; // Sunday is 0, Saturday is 6.
}

const HoursSelector = ({ numeral }: HoursSelectorProps) => {
  const { openTimesMetric, setOpenTimesMetric } = useContext(
    BookingSlotsContext,
  );

  const setRange = (range: TimeRange) => {
    const updatedDays = [...openTimesMetric];
    updatedDays[numeral] = { ...updatedDays[numeral], range };
    setOpenTimesMetric(updatedDays);
  };

  const day = openTimesMetric[numeral];

  return (
    <div>
      <div className="flex items-end justify-between pb-2 leading-none">
        <div className="text-lg font-medium">
          {TIME.DAYS_OF_THE_WEEK[numeral]}
        </div>
        <div className="font-medium">
          {minsIntoHumanTime(day.range[0])}
          <div className="inline px-1 font-mono text-lg">→</div>
          {minsIntoHumanTime(day.range[1])}
        </div>
      </div>

      <RangeSlider
        defaultValue={[day.range[0], day.range[1]]}
        step={15}
        min={0}
        max={humanTimeIntoMins(24, 0)}
        onChange={setRange}
        tooltip={false}
      />
    </div>
  );
};
