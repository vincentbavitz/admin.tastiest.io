import { ExitIcon } from '@tastiest-io/tastiest-icons';
import classNames from 'classnames';
import React, { ReactNode, useRef } from 'react';
import { useClickAway, useKey } from 'react-use';
import { UI } from '../constants';

interface Props {
  title?: string;
  isOpen: boolean;
  children: ReactNode;
  // size: 'small' | 'regular' | 'large';
  className?: string;
  close?: () => void;
}

export function Modal(props: Props) {
  const { title, isOpen, close, className, children } = props;

  const ref = useRef(null);
  const boxRef = useRef(null);
  useKey('Escape', close);
  useClickAway(boxRef, close);
  // useLockBodyScroll(isOpen);

  const padding = UI.PAGE_CONTAINED_PADDING_VW;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        zIndex: UI.Z_INDEX_MODAL_OVERLAY,
        paddingLeft: `${padding}vw`,
        paddingRight: `${padding}vw`,
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
    >
      <div
        ref={boxRef}
        className={classNames(
          'relative whitespace-normal border-2 border-gray px-6 pb-4 bg-white',
          className,
        )}
      >
        <div className="flex items-center justify-between w-full py-3 space-x-6">
          <div className="w-8"></div>

          <div className="flex-1 text-center">
            {title && (
              <h3 className="text-xl font-medium text-gray-700">{title}</h3>
            )}
          </div>

          <ExitIcon
            onClick={close}
            className="w-5 text-gray-300 duration-150 cursor-pointer fill-current hover:text-gray-400"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
