import { EditOutlined } from '@ant-design/icons';
import { Button } from '@tastiest-io/tastiest-components';
import { IRestaurantData } from '@tastiest-io/tastiest-utils';
import React, { useState } from 'react';
import { minsIntoHumanTime } from 'utils/time';
import { TIME } from '../../constants';
import QuietTimesSelector from '../restautants/QuietTimesSelector';

interface Props {
  restaurantData: Partial<IRestaurantData>;
}

export default function QuietTimesBlock(props: Props) {
  const { restaurantData } = props;
  const [quietTimesSelectorOpen, setQuietTimesSelectorOpen] = useState(false);

  return (
    <>
      <QuietTimesSelector
        restaurantId={restaurantData.details.id}
        isOpen={quietTimesSelectorOpen}
        close={() => setQuietTimesSelectorOpen(false)}
      />

      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between w-full py-1 pl-2 mb-2 rounded-t-lg bg-alt-1">
          <div className="text-lg font-medium text-white">Quiet Times</div>

          <Button
            color="neutral"
            type="text"
            onClick={() => setQuietTimesSelectorOpen(true)}
          >
            <EditOutlined className="text-xl fill-current" />
          </Button>
        </div>

        <div className="flex flex-col px-2 pb-2">
          {Object.entries(restaurantData.metrics.quietTimes).map(
            ([key, day]) => {
              return day.active ? (
                <div
                  key={key}
                  className="flex justify-between px-2 py-2 text-base text-alt"
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
            },
          )}
        </div>
      </div>
    </>
  );
}
