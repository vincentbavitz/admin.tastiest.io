import { Button } from '@tastiest-io/tastiest-ui';
import React, { ReactNode } from 'react';
import { Modal } from './Modal';

interface Props {
  // Text
  title: string;
  children: ReactNode;

  // Confirmation props
  onAccept: () => void;
  onReject?: () => void;
  acceptText?: string;
  rejectText?: string;

  // Controls
  isOpen: boolean;
  close?: () => void;
}

export function ConfirmationModal(props: Props) {
  const {
    title,
    children,
    onAccept,
    onReject,
    acceptText = 'Ok',
    rejectText = 'Cancel',
    isOpen,
    close,
  } = props;

  return (
    <Modal title={title} isOpen={isOpen} close={close}>
      <div style={{ maxWidth: '33rem' }} className="flex flex-col space-y-6">
        <div>{children}</div>

        <div className="flex justify-end space-x-2">
          <Button size="small" onClick={onAccept}>
            {acceptText}
          </Button>
          {onReject && (
            <Button size="small" onClick={onReject} color="neutral">
              {rejectText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
