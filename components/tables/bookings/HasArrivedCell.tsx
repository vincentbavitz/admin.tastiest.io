import { CheckFilledIcon } from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import CodeSpan from 'components/CodeSpan';
import { ConfirmationModal } from 'components/ConfirmationModal';
import React, { useState } from 'react';

export const HasArrivedCell = ({
  value: initialValue,
  row: { index, original: booking },
  column: { id },
  updateData,
}: {
  value: number | null;
  row: any;
  column: any;
  updateData: any;
}) => {
  const code = booking.confirmationCode;
  const [typedCode, setTypedCode] = useState<string>();
  const [codeError, setCodeError] = useState<string>();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // We need to keep and update the state of the cell normally
  const [arrived, setArrived] = React.useState(initialValue ?? false);

  // Update locally and on server side on change
  const onClickIcon = () => {
    setModalIsOpen(true);
  };

  const setArrivedFalse = () => {
    setTypedCode(null);
    setArrived(false);
    updateData(false, index, id);
  };

  const setArrivedTrue = () => {
    setModalIsOpen(false);
    setArrived(true);
    updateData(true, index, id);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setArrived(initialValue ?? false);
  }, [initialValue]);

  return (
    <div className="flex items-center justify-center">
      <ConfirmationModal
        title="Are you sure?"
        isOpen={modalIsOpen}
        acceptText="Yes"
        rejectText="No"
        onAccept={() => {
          if (arrived) {
            setArrivedFalse();
          } else {
            setArrivedTrue();
          }
        }}
        onReject={() => setModalIsOpen(false)}
        close={() => setModalIsOpen(false)}
      >
        <div
          style={{ maxWidth: '27rem' }}
          className="flex flex-col items-center mt-4 space-y-6"
        >
          <div>
            <p className="leading-relaxed">
              Are you sure you want to manually edit the{' '}
              <CodeSpan>hasArrived</CodeSpan> property for{' '}
              <span className="font-bold">{booking.eaterName}</span> to{' '}
              <CodeSpan>
                <span className="font-bold">{String(!arrived)}</span>
              </CodeSpan>
              ?
            </p>
          </div>
        </div>
      </ConfirmationModal>

      <CheckFilledIcon
        onClick={onClickIcon}
        className={clsx(
          'fill-current w-8 cursor-pointer',
          arrived ? 'text-primary' : 'text-gray-300',
        )}
      />
    </div>
  );
};
