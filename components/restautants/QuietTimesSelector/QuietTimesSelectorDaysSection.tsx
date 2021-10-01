import { CheckOutlined } from '@ant-design/icons';
import { Button, Tooltip } from '@tastiest-io/tastiest-components';
import { TIME, titleCase } from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import {
  QuietTimesContext,
  QuietTimesSelectorSteps,
} from './QuietTimesContext';

export const QuietTimesSelectorDaysSection = () => {
  const { days, setDays, setStep } = useContext(QuietTimesContext);
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (day: number) => {
    const updated = [...days];
    updated[day] = { ...updated[day], active: !updated[day].active };
    setDays(updated);
  };

  const nextStep = () => {
    // If no days are selected, prompt them
    if (!days.some(d => d.active)) {
      setError('Please select at least one day');
      setTimeout(() => setError(null), 4000);
      return;
    }

    setError(null);
    setStep(QuietTimesSelectorSteps.HOURS);
  };

  return (
    <>
      <div className="w-full">
        <h4 className="w-full pb-3 text-base font-medium text-center">
          Which days are usually the most quiet?
        </h4>

        <div className="flex flex-col items-center flex-grow space-y-4">
          <div className="flex flex-col w-full overflow-hidden rounded-md">
            {TIME.DAYS_OF_THE_WEEK.map((day, key) => {
              const selected = days[key].active;

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
