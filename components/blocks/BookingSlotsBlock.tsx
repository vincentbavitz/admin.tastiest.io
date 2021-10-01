import { EditOutlined } from '@ant-design/icons';
import {
  dlog,
  IRestaurantData,
  minsIntoHumanTime,
  TIME,
} from '@tastiest-io/tastiest-utils';
import { GetBookingSlotsReturn } from 'pages/api/getBookingSlots';
import React, { useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import BookingSlotsSelector from '../restautants/BookingSlotsSelector';
import { BookingSlotsProvider } from '../restautants/BookingSlotsSelector/BookingSlotsContext';
import BlockTemplate from './BlockTemplate';

interface Props {
  restaurantData: Partial<IRestaurantData>;
}

export default function BookingSlotsBlock(props: Props) {
  return (
    <BookingSlotsProvider>
      <BookingSlotsBlockInner {...props} />
    </BookingSlotsProvider>
  );
}

function BookingSlotsBlockInner(props: Props) {
  const { restaurantData } = props;
  const [openTimesSelectorOpen, setOpenTimesSelectorOpen] = useState(false);

  const {
    data: { openTimes, seatingDuration } = {
      openTimes: null,
      seatingDuration: null,
    },
  } = useSWR<GetBookingSlotsReturn>(
    `${LocalEndpoint.GET_BOOKING_SLOTS}?restaurantId=${restaurantData.details.id}`,
    {
      refreshInterval: 30000,
      refreshWhenHidden: true,
    },
  );

  dlog('BookingSlotsBlock ➡️ openTimes:', openTimes);

  return (
    <>
      <BookingSlotsSelector
        restaurantId={restaurantData.details.id}
        isOpen={openTimesSelectorOpen}
        close={() => setOpenTimesSelectorOpen(false)}
      />

      <BlockTemplate
        title="Booking Slots"
        theme="alt-1"
        icon={EditOutlined}
        onIconClick={() => setOpenTimesSelectorOpen(true)}
      >
        <div className="flex flex-col">
          <div className="pb-3 text-left">
            Seating duration: {seatingDuration} mins
          </div>

          {openTimes ? (
            Object.entries(openTimes).map(([key, day]) => {
              return day.open ? (
                <div
                  key={key}
                  className="flex justify-between py-2 text-base text-alt"
                >
                  <div className="font-medium">
                    {TIME.DAYS_OF_THE_WEEK[key]}
                  </div>
                  <div className="">
                    {minsIntoHumanTime(day.range[0])}
                    <div className="inline px-1 font-mono">→</div>
                    {minsIntoHumanTime(day.range[1])}
                  </div>
                </div>
              ) : null;
            })
          ) : (
            <div className="flex items-center justify-center h-20">
              No booking slots set.
            </div>
          )}
        </div>
      </BlockTemplate>
    </>
  );
}
