import { ExitFilledIcon } from '@tastiest-io/tastiest-icons';
import { IBooking } from '@tastiest-io/tastiest-utils';
import clsx from 'clsx';
import { ConfirmationModal } from 'components/ConfirmationModal';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';

export const HasCancelledCell = ({
  value: initialValue,
  row: { index, original },
  column: { id },
  updateData,
}: {
  value: number | null;
  row: any;
  column: any;
  updateData: any;
}) => {
  const booking: IBooking = original;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // We need to keep and update the state of the cell normally
  const [cancelled, setCancelled] = React.useState(initialValue ?? false);

  const { adminUser } = useAuth();

  // Update locally and on server side on change
  const onClickIcon = () => {
    // Open confirmation modal if not confirmed
    if (!cancelled && !modalIsOpen) {
      setModalIsOpen(true);
      return;
    }

    // Cancellation is final. Can't un-cancel.
    if (cancelled) {
      return;
    }
  };

  const confirmCancellation = () => {
    setModalIsOpen(false);
    setCancelled(true);
    updateData(true, index, id);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setCancelled(initialValue ?? false);
  }, [initialValue]);

  return (
    <div className="flex items-center justify-center">
      <ConfirmationModal
        title="Cancel Booking"
        isOpen={modalIsOpen}
        close={() => setModalIsOpen(false)}
        onAccept={() => confirmCancellation()}
        onReject={() => setModalIsOpen(false)}
      >
        <>
          <p className="font-medium text-gray-700">
            Note! Cancelling the booking is final.
          </p>

          <div className="pt-3 justify">
            <p>
              Cancelling will notify the user via email and register with our
              payments department. If you are sure you want to cancel the
              booking for
              <br />
              <span className="font-medium">{booking.eaterName}</span>, click{' '}
              <span className="font-medium">Ok</span>.
            </p>
          </div>
        </>
      </ConfirmationModal>

      <ExitFilledIcon
        onClick={onClickIcon}
        className={clsx(
          'fill-current w-8',
          cancelled ? 'text-primary' : 'text-gray-300',
          !cancelled && 'cursor-pointer',
        )}
      />
    </div>
  );
};
