import { EditOutlined } from '@ant-design/icons';
import { IRestaurantData, WeekOpenTimes } from '@tastiest-io/tastiest-utils';
import { BookingSlotsProvider } from 'components/restautants/BookingSlotsSelector/BookingSlotsContext';
import React, { useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import { minsIntoHumanTime } from 'utils/time';
import { TIME } from '../../constants';
import BookingSlotsSelector from '../restautants/BookingSlotsSelector';
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

  const { data: openTimes } = useSWR<WeekOpenTimes>(
    `${LocalEndpoint.GET_OPEN_TIMES}?restaurantId=${restaurantData.details.id}`,
    {
      refreshInterval: 30000,
      refreshWhenHidden: true,
      initialData: restaurantData.metrics.openTimes,
    },
  );

  return (
    <>
      <BookingSlotsSelector
        restaurantId={restaurantData.details.id}
        isOpen={openTimesSelectorOpen}
        close={() => setOpenTimesSelectorOpen(false)}
      />

      <BlockTemplate
        title="Trading Hours"
        theme="alt-1"
        icon={EditOutlined}
        onIconClick={() => setOpenTimesSelectorOpen(true)}
      >
        <div className="flex flex-col">
          {Object.entries(openTimes).map(([key, day]) => {
            return day.open ? (
              <div
                key={key}
                className="flex justify-between py-2 text-base text-alt"
              >
                <div className="font-medium">{TIME.DAYS_OF_THE_WEEK[key]}</div>
                <div className="">
                  {minsIntoHumanTime(day.range[0])}
                  <div className="inline px-1 font-mono">→</div>
                  {minsIntoHumanTime(day.range[1])}
                </div>
              </div>
            ) : null;
          })}
        </div>
      </BlockTemplate>
    </>
  );
}
