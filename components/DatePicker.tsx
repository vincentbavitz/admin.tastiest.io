import { CalendarIcon } from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  date?: Date;
  onChange: (value: Date) => void;
  openToDate?: Date;
  disabled?: boolean;
}

export default function DatePicker(props: Props) {
  const { date, onChange, openToDate, disabled = false } = props;

  const dateText = (
    <p className={clsx('font-medium', !disabled && 'cursor-pointer')}>
      {moment(date).format('DD/M/YY')}
    </p>
  );

  return (
    <div className="">
      {disabled ? (
        <>{dateText}</>
      ) : (
        <ReactDatePicker
          selected={date}
          onChange={onChange}
          popperPlacement={'bottom-end'}
          openToDate={openToDate}
          customInput={
            date ? (
              dateText
            ) : (
              <CalendarIcon
                className={clsx(
                  'fill-current stroke-current w-6 cursor-pointer',
                  'text-gray-300',
                )}
              />
            )
          }
        />
      )}
    </div>
  );
}
