import {
  DayOfWeek,
  humanTimeIntoMins,
  postFetch,
  QuietTimesMetricDay,
  TIME,
} from '@tastiest-io/tastiest-utils';
import { SetQuietTimesParams } from 'pages/api/setQuietTimes';
import React, { useState } from 'react';
import { mutate } from 'swr';
import { LocalEndpoint } from 'types/api';

export enum QuietTimesSelectorSteps {
  DAYS,
  HOURS,
  COVERS,
}

export type QuietTimesArray = [
  QuietTimesMetricDay,
  QuietTimesMetricDay,
  QuietTimesMetricDay,
  QuietTimesMetricDay,
  QuietTimesMetricDay,
  QuietTimesMetricDay,
  QuietTimesMetricDay,
];

type QuietTimes = {
  step: QuietTimesSelectorSteps;
  days: QuietTimesMetricDay[];
  setDays: React.Dispatch<React.SetStateAction<QuietTimesMetricDay[]>>;
  setStep: React.Dispatch<React.SetStateAction<QuietTimesSelectorSteps>>;
  saving: boolean;
  saveQuietTimes: (restaurantId: string) => Promise<void>;
  resetToDefaults: () => void;
};

const startTime = humanTimeIntoMins(8, 0);
const endTime = humanTimeIntoMins(17, 0);
const defaultValue: QuietTimesMetricDay = {
  active: false,
  range: [startTime, endTime],
  coversRequired: 1,
};

export type DayNumeral = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const QuietTimesContext = React.createContext<QuietTimes>(undefined);

export const QuietTimesProvider = ({ children }) => {
  const [step, setStep] = useState<QuietTimesSelectorSteps>(
    QuietTimesSelectorSteps.DAYS,
  );

  // Loading for the save button
  const [saving, setSaving] = useState(false);

  // Days of the week where Sunday = 0, Saturday = 6
  const [days, setDays] = useState<QuietTimesArray>(
    Array(TIME.DAYS_IN_WEEK).fill(defaultValue) as QuietTimesArray,
  );

  const saveQuietTimes = async (restaurantId: string) => {
    if (step !== QuietTimesSelectorSteps.COVERS) {
      return;
    }

    mutate(
      `${LocalEndpoint.GET_QUIET_TIMES}?restaurantId=${restaurantId}`,
      {
        [DayOfWeek.SUNDAY]: days[DayOfWeek.SUNDAY],
        [DayOfWeek.MONDAY]: days[DayOfWeek.MONDAY],
        [DayOfWeek.TUESDAY]: days[DayOfWeek.TUESDAY],
        [DayOfWeek.WEDNESDAY]: days[DayOfWeek.WEDNESDAY],
        [DayOfWeek.THURSDAY]: days[DayOfWeek.THURSDAY],
        [DayOfWeek.FRIDAY]: days[DayOfWeek.FRIDAY],
        [DayOfWeek.SATURDAY]: days[DayOfWeek.SATURDAY],
      },
      false,
    );

    setSaving(true);
    await postFetch<SetQuietTimesParams>(LocalEndpoint.SET_QUIET_TIMES, {
      restaurantId,
      quietTimesArray: days,
    });

    setSaving(false);
  };

  const resetToDefaults = () => {
    setStep(QuietTimesSelectorSteps.DAYS);
    setDays(Array(TIME.DAYS_IN_WEEK).fill(defaultValue) as QuietTimesArray);
  };

  const params: QuietTimes = {
    step,
    days,
    setDays,
    setStep,
    saving,
    saveQuietTimes,
    resetToDefaults,
  };

  return (
    <QuietTimesContext.Provider value={params}>
      {children}
    </QuietTimesContext.Provider>
  );
};
