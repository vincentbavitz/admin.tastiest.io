import { Modal } from '@tastiest-io/tastiest-ui';
import React, { useContext } from 'react';
import {
  BookingSlotsContext,
  BookingSlotsSelectorSteps,
} from './BookingSlotsContext';
import { BookingSlotsSelectorDaysSection } from './BookingSlotsSelectorDaysSection';
import { BookingSlotsSelectorHoursSection } from './BookingSlotsSelectorHoursSection';
import { BookingSlotsSelectorSlotsSection } from './BookingSlotsSelectorSlotsSection';

interface Props {
  restaurantId: string;
  isOpen: boolean;
  close: () => void;
}

export default function BookingSlotsSelector(props: Props) {
  const { restaurantId, isOpen, close } = props;
  const { step, resetToDefaults } = useContext(BookingSlotsContext);

  const closeSelector = () => {
    resetToDefaults();
    close();
  };

  return (
    <Modal show={isOpen} title="Booking Slots" close={closeSelector}>
      <div
        style={{ width: '300px', minHeight: '300px' }}
        className="relative flex flex-col items-center justify-between h-full"
      >
        {step === BookingSlotsSelectorSteps.DAYS && (
          <BookingSlotsSelectorDaysSection />
        )}

        {step === BookingSlotsSelectorSteps.HOURS && (
          <BookingSlotsSelectorHoursSection />
        )}

        {step === BookingSlotsSelectorSteps.SLOTS && (
          <BookingSlotsSelectorSlotsSection
            restaurantId={restaurantId}
            close={close}
          />
        )}
      </div>
    </Modal>
  );
}
