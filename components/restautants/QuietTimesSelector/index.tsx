import { Modal } from 'components/Modal';
import React, { useContext } from 'react';
import {
  QuietTimesContext,
  QuietTimesSelectorSteps,
} from './QuietTimesContext';
import { QuietTimesSelectorCoversSection } from './QuietTimesSelectorCoversSection';
import { QuietTimesSelectorDaysSection } from './QuietTimesSelectorDaysSection';
import { QuietTimesSelectorHoursSection } from './QuietTimesSelectorHoursSection';

interface Props {
  restaurantId: string;
  isOpen: boolean;
  close: () => void;
}

export default function QuietTimesSelector(props: Props) {
  const { restaurantId, isOpen, close } = props;
  const { step, resetToDefaults } = useContext(QuietTimesContext);

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
        {step === QuietTimesSelectorSteps.DAYS && (
          <QuietTimesSelectorDaysSection />
        )}

        {step === QuietTimesSelectorSteps.HOURS && (
          <QuietTimesSelectorHoursSection />
        )}

        {step === QuietTimesSelectorSteps.COVERS && (
          <QuietTimesSelectorCoversSection
            restaurantId={restaurantId}
            close={close}
          />
        )}
      </div>
    </Modal>
  );
}
