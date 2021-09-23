import { Button } from '@tastiest-io/tastiest-components';
import { TimeRange } from '@tastiest-io/tastiest-utils/dist/types/time';
import React, { useContext } from 'react';
import { RangeSlider } from 'rsuite';
import { humanTimeIntoMins, minsIntoHumanTime } from 'utils/time';
import { TIME } from '../../../constants';
import {
  QuietTimesContext,
  QuietTimesSelectorSteps,
} from './QuietTimesContext';

export const QuietTimesSelectorHoursSection = () => {
  const { days, setStep } = useContext(QuietTimesContext);

  return (
    <>
      <div className="">
        <h4 className="pb-6 text-base font-medium leading-tight text-center">
          During which hours are you the most busy?
        </h4>

        <div className="flex flex-col space-y-8">
          {days.map((day, index) =>
            day.active ? <HoursSelector key={index} numeral={index} /> : null,
          )}
        </div>
      </div>

      <div className="flex justify-center pt-6 space-x-2">
        <Button
          color="neutral"
          onClick={() => setStep(QuietTimesSelectorSteps.DAYS)}
        >
          Back
        </Button>
        <Button onClick={() => setStep(QuietTimesSelectorSteps.COVERS)}>
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
  const { days, setDays } = useContext(QuietTimesContext);

  const setRange = (range: TimeRange) => {
    const updatedDays = [...days];
    updatedDays[numeral] = { ...updatedDays[numeral], range };
    setDays(updatedDays);
  };

  const day = days[numeral];

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
