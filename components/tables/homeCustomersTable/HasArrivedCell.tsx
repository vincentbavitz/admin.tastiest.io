import { Button, Input } from '@tastiest-io/tastiest-components';
import { CheckFilledIcon } from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import { Modal } from 'components/Modal';
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
    // Open confirmation modal if not confirmed
    if (!arrived && !modalIsOpen) {
      setModalIsOpen(true);
      return;
    }

    if (arrived) {
      setTypedCode(null);
      setArrived(false);
      updateData(false, index, id);
    }
  };

  const submitCode = () => {
    setCodeError(null);

    if (!typedCode?.length) {
      return;
    }

    if (typedCode !== code) {
      setCodeError('Invalid confirmation code');
      return;
    }

    // Code success!
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
      <Modal
        title="Confirmation Code"
        isOpen={modalIsOpen}
        close={() => setModalIsOpen(false)}
      >
        <div
          style={{ maxWidth: '25rem' }}
          className="flex flex-col items-center mt-4 space-y-6"
        >
          <div>
            <p className="text-sm text-gray-600">
              Please ask the customer for the code they got in <br />
              their confirmation email
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-20">
              <Input
                center
                value={typedCode}
                onValueChange={setTypedCode}
                placeholder={'0000'}
                maxLength={4}
              />
            </div>

            <Button
              color="primary"
              size="small"
              className="h-10"
              onClick={submitCode}
            >
              Confirm
            </Button>
          </div>

          {codeError && (
            <div className="">
              <p className="text-sm text-danger">{codeError}</p>
            </div>
          )}
        </div>
      </Modal>

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
