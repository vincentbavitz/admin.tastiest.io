import { Modal } from 'components/Modal';
import React, { useContext } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import {
  BookingSlotsContext,
  BookingSlotsSelectorSteps,
} from './BookingSlotsContext';
import { BookingSlotsSelectorDaysSection } from './BookingSlotsSelectorDaysSection';
import { BookingSlotsSelectorHoursSection } from './BookingSlotsSelectorHoursSection';

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
    <Modal isOpen={isOpen} title="Quiet times" close={closeSelector}>
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

        {/* {step === BookingSlotsSelectorSteps.COVERS && (
          <BookingSlotsSelectorCoversSection
            restaurantId={restaurantId}
            close={close}
          />
        )} */}
      </div>
    </Modal>
  );
}
