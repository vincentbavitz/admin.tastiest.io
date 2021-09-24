import { EditOutlined } from '@ant-design/icons';
import { IRestaurantData, WeekQuietTimes } from '@tastiest-io/tastiest-utils';
import { QuietTimesProvider } from 'components/restautants/QuietTimesSelector/QuietTimesContext';
import React, { useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';
import { minsIntoHumanTime } from 'utils/time';
import { TIME } from '../../constants';
import QuietTimesSelector from '../restautants/QuietTimesSelector';
import BlockTemplate from './BlockTemplate';

interface Props {
  restaurantData: Partial<IRestaurantData>;
}

export default function QuietTimesBlock(props: Props) {
  return (
    <QuietTimesProvider>
      <QuietTimesBlockInner {...props} />
    </QuietTimesProvider>
  );
}

function QuietTimesBlockInner(props: Props) {
  const { restaurantData } = props;
  const [quietTimesSelectorOpen, setQuietTimesSelectorOpen] = useState(false);

  const { data: quietTimes } = useSWR<WeekQuietTimes>(
    `${LocalEndpoint.GET_QUIET_TIMES}?restaurantId=${restaurantData.details.id}`,
    {
      refreshInterval: 30000,
      refreshWhenHidden: true,
      initialData: restaurantData.metrics.quietTimes,
    },
  );

  return (
    <>
      <QuietTimesSelector
        restaurantId={restaurantData.details.id}
        isOpen={quietTimesSelectorOpen}
        close={() => setQuietTimesSelectorOpen(false)}
      />

      <BlockTemplate
        title="Quiet Times"
        theme="alt-1"
        icon={EditOutlined}
        onIconClick={() => setQuietTimesSelectorOpen(true)}
      >
        <div className="flex flex-col">
          {Object.entries(quietTimes).map(([key, day]) => {
            return day.active ? (
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
