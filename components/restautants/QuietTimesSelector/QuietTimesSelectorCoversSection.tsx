import { Button } from '@tastiest-io/tastiest-components';
import { TIME } from '@tastiest-io/tastiest-utils';
import React, { useContext } from 'react';
import { Slider } from 'rsuite';
import {
  QuietTimesContext,
  QuietTimesSelectorSteps,
} from './QuietTimesContext';

interface Props {
  restaurantId: string;
  close: () => void;
}

export const QuietTimesSelectorCoversSection = (props: Props) => {
  const { restaurantId, close } = props;
  const { days, setStep, saveQuietTimes, resetToDefaults, saving } = useContext(
    QuietTimesContext,
  );

  const save = async () => {
    await saveQuietTimes(restaurantId);
    resetToDefaults();
    close();
  };

  return (
    <>
      <div>
        <h4 className="pb-6 text-base font-medium leading-tight text-center">
          How many covers are you looking to fill on these days?
        </h4>

        <div className="flex flex-col space-y-8">
          {days.map((day, index) =>
            day.active ? <CoversSelector key={index} numeral={index} /> : null,
          )}
        </div>
      </div>

      <div className="flex justify-center pt-6 space-x-2">
        <Button
          color="light"
          onClick={() => setStep(QuietTimesSelectorSteps.HOURS)}
        >
          Back
        </Button>
        <Button loading={saving} onClick={save}>
          Save
        </Button>
      </div>
    </>
  );
};

interface CoversSelectorProps {
  numeral: number; // Sunday is 0, Saturday is 6.
}

const CoversSelector = ({ numeral }: CoversSelectorProps) => {
  const { days, setDays, setStep } = useContext(QuietTimesContext);
  const day = days[numeral];

  const setValue = (value: number) => {
    const updatedDays = [...days];
    updatedDays[numeral] = { ...updatedDays[numeral], coversRequired: value };
    setDays(updatedDays);
  };

  return (
    <div>
      <div className="flex items-end justify-between pb-2 leading-none">
        <div className="text-lg font-medium">
          {TIME.DAYS_OF_THE_WEEK[numeral]}
        </div>
        <div className="leading-none text-gray-500">
          Covers to fill:{' '}
          <span className="font-bold text-primary">{day.coversRequired}</span>
        </div>
      </div>

      <Slider
        defaultValue={day.coversRequired}
        step={1}
        min={1}
        max={50}
        progress
        onChange={setValue}
      />
    </div>
  );
};
