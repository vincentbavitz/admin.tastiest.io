import { Button } from '@tastiest-io/tastiest-ui';
import React, { useContext } from 'react';
import { Slider } from 'rsuite';
import {
  BookingSlotsContext,
  BookingSlotsSelectorSteps,
} from './BookingSlotsContext';

interface Props {
  restaurantId: string;
  close: () => void;
}

export const BookingSlotsSelectorSlotsSection = (props: Props) => {
  const { restaurantId, close } = props;
  const {
    openTimesMetric,
    setStep,
    saveBookingSlots,
    resetToDefaults,
    saving,
    seatingDuration,
    setSeatingDuration,
  } = useContext(BookingSlotsContext);

  const save = async () => {
    await saveBookingSlots(restaurantId);
    resetToDefaults();
    close();
  };

  return (
    <>
      <div>
        <h4 className="pb-4 text-base font-medium leading-tight text-center">
          What is your typical seating duration?
        </h4>

        <p className="text-center">
          Defining your seating duration allows Tastiest to accurately calculate
          your available seats throughout the day.
        </p>

        <p className="text-center">
          Using this information we can ensure you are never over-booked.
        </p>

        <div className="pt-8">
          <div className="flex items-center justify-between pb-2 space-x-4">
            <div className="text-base font-medium">Seating duration</div>
            <div>{seatingDuration} minutes</div>
          </div>

          <Slider
            defaultValue={seatingDuration}
            step={1}
            min={10}
            max={120}
            progress
            onChange={setSeatingDuration}
          />
        </div>
      </div>

      <div className="flex justify-center pt-6 space-x-2">
        <Button
          color="neutral"
          onClick={() => setStep(BookingSlotsSelectorSteps.HOURS)}
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
