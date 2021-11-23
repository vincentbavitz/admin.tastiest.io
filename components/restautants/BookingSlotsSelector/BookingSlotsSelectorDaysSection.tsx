import { CheckOutlined } from '@ant-design/icons';
import { Button, Tooltip } from '@tastiest-io/tastiest-ui';
import { TIME, titleCase } from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import {
  BookingSlotsContext,
  BookingSlotsSelectorSteps,
} from './BookingSlotsContext';

export const BookingSlotsSelectorDaysSection = () => {
  const { openTimesMetric, setOpenTimesMetric, setStep } = useContext(
    BookingSlotsContext,
  );
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (day: number) => {
    const updated = [...openTimesMetric];
    updated[day] = { ...updated[day], open: !updated[day].open };
    setOpenTimesMetric(updated);
  };

  const nextStep = () => {
    // If no days are selected, prompt them
    if (!openTimesMetric.some(d => d.open)) {
      setError('Please select at least one day');
      setTimeout(() => setError(null), 4000);
      return;
    }

    setError(null);
    setStep(BookingSlotsSelectorSteps.HOURS);
  };

  return (
    <>
      <div className="w-full">
        <h4 className="w-full pb-3 text-base font-medium text-center">
          Which days are you open?
        </h4>

        <div className="flex flex-col items-center flex-grow space-y-4">
          <div className="flex flex-col w-full overflow-hidden rounded-md">
            {TIME.DAYS_OF_THE_WEEK.map((day, key) => {
              const selected = openTimesMetric[key].open;

              return (
                <div
                  key={key}
                  className={clsx(
                    'flex items-center justify-between cursor-pointer  duration-300 flex-1 px-2 py-2',
                    selected
                      ? 'bg-secondary'
                      : 'bg-secondary-2 bg-opacity-50 hover:bg-opacity-100',
                  )}
                  onClick={() => toggleDay(key)}
                >
                  <div className="w-5"></div>
                  <div>
                    <span className="font-medium text-opacity-75 duration-300 hover:text-opacity-100 text-alt">
                      {titleCase(day)}
                    </span>
                  </div>

                  <div className="flex items-center w-5 text-lg">
                    {selected ? <CheckOutlined /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Tooltip
          trigger="manual"
          content={error}
          placement="bottom"
          isOpen={Boolean(error)}
        >
          <Button onClick={nextStep}>Next</Button>
        </Tooltip>
      </div>
    </>
  );
};
