import { ResponsiveBar } from '@nivo/bar';
import React from 'react';

const theme = {
  background: '#ffffff',
  textColor: '#333333',
  fontSize: 12,
  axis: {
    domain: {
      line: {
        stroke: '#ffffff',
        strokeWidth: 0,
      },
    },
    ticks: {
      line: {
        stroke: '#ffffff',
        strokeWidth: 0,
      },
    },
  },
};

interface Props {
  data: any;
  keys: string[];
  indexBy: string;
}

export default function BarChart(props: Props) {
  const { data, keys, indexBy } = props;

  return (
    <div className="w-full h-full">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        theme={theme}
        margin={{ top: 15, right: 15, bottom: 30, left: 40 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'yellow_orange_red' }}
        borderColor={{ from: '#ffd505' }}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: 4,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}
