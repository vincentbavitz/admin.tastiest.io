import { DayOfWeek, OpenTimesMetricDay } from '@tastiest-io/tastiest-utils';
import React, { useState } from 'react';
import { mutate } from 'swr';
import { LocalEndpoint } from 'types/api';
import { humanTimeIntoMins } from 'utils/time';
import { TIME } from '../../../constants';

export enum BookingSlotsSelectorSteps {
  DAYS,
  HOURS,
  COVERS,
}

export type OpenTimesArray = [
  OpenTimesMetricDay,
  OpenTimesMetricDay,
  OpenTimesMetricDay,
  OpenTimesMetricDay,
  OpenTimesMetricDay,
  OpenTimesMetricDay,
  OpenTimesMetricDay,
];

type BookingSlots = {
  step: BookingSlotsSelectorSteps;
  setStep: React.Dispatch<React.SetStateAction<BookingSlotsSelectorSteps>>;
  saving: boolean;
  seatingDuration: number; // in minutes
  openTimesMetric: OpenTimesMetricDay[];
  setOpenTimesMetric: React.Dispatch<
    React.SetStateAction<OpenTimesMetricDay[]>
  >;

  saveBookingSlots: (restaurantId: string) => Promise<void>;
  resetToDefaults: () => void;
};

const startTime = humanTimeIntoMins(9, 0);
const endTime = humanTimeIntoMins(20, 0);
const defaultValue: OpenTimesMetricDay = {
  open: false,
  range: [startTime, endTime],
};

export type DayNumeral = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const BookingSlotsContext = React.createContext<BookingSlots>(undefined);

export const BookingSlotsProvider = ({ children }) => {
  const [step, setStep] = useState<BookingSlotsSelectorSteps>(
    BookingSlotsSelectorSteps.DAYS,
  );

  // Loading for the save button
  const [saving, setSaving] = useState(false);

  // Days of the week where Sunday = 0, Saturday = 6
  const [openTimesMetric, setOpenTimesMetric] = useState<OpenTimesArray>(
    Array(TIME.DAYS_IN_WEEK).fill(defaultValue) as OpenTimesArray,
  );

  const saveBookingSlots = async (restaurantId: string) => {
    if (step !== BookingSlotsSelectorSteps.COVERS) {
      return;
    }

    mutate(
      `${LocalEndpoint.GET_OPEN_TIMES}?restaurantId=${restaurantId}`,
      {
        [DayOfWeek.SUNDAY]: openTimesMetric[DayOfWeek.SUNDAY],
        [DayOfWeek.MONDAY]: openTimesMetric[DayOfWeek.MONDAY],
        [DayOfWeek.TUESDAY]: openTimesMetric[DayOfWeek.TUESDAY],
        [DayOfWeek.WEDNESDAY]: openTimesMetric[DayOfWeek.WEDNESDAY],
        [DayOfWeek.THURSDAY]: openTimesMetric[DayOfWeek.THURSDAY],
        [DayOfWeek.FRIDAY]: openTimesMetric[DayOfWeek.FRIDAY],
        [DayOfWeek.SATURDAY]: openTimesMetric[DayOfWeek.SATURDAY],
      },
      false,
    );

    setSaving(true);
    // await postFetch<SetBookingSlotsParams>(LocalEndpoint.SET_QUIET_TIMES, {
    //   restaurantId,
    //   quietTimesArray: days,
    // });

    setSaving(false);
  };

  const resetToDefaults = () => {
    setStep(BookingSlotsSelectorSteps.DAYS);
    setOpenTimesMetric(
      Array(TIME.DAYS_IN_WEEK).fill(defaultValue) as OpenTimesArray,
    );
  };

  const params: BookingSlots = {
    step,
    setStep,
    saving,
    saveBookingSlots,
    resetToDefaults,
    openTimesMetric,
    setOpenTimesMetric,
  };

  return (
    <BookingSlotsContext.Provider value={params}>
      {children}
    </BookingSlotsContext.Provider>
  );
};
