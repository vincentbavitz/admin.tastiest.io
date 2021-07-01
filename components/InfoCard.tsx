import { ResponsiveLine } from '@nivo/line';
import React from 'react';

interface InfoCardProps {
  label: string;
  info: string | number;
  chart?: boolean;
  color?: string;
}

// const data = [
//   {
//     id: 'germany',
//     data: [
//       {
//         x: 'plane',
//         y: 243,
//       },
//       {
//         x: 'helicopter',
//         y: 72,
//       },
//       {
//         x: 'boat',
//         y: 25,
//       },
//       {
//         x: 'train',
//         y: 207,
//       },
//       {
//         x: 'subway',
//         y: 299,
//       },
//       {
//         x: 'bus',
//         y: 186,
//       },
//       {
//         x: 'car',
//         y: 56,
//       },
//       {
//         x: 'moto',
//         y: 80,
//       },
//       {
//         x: 'bicycle',
//         y: 249,
//       },
//       {
//         x: 'horse',
//         y: 27,
//       },
//       {
//         x: 'skateboard',
//         y: 141,
//       },
//       {
//         x: 'others',
//         y: 155,
//       },
//     ],
//   },
// ];
const data = [];

export default function InfoCard(props: InfoCardProps) {
  const { label, info, chart, color = 'primary' } = props;

  return (
    <div className={`w-full rounded-lg bg-${color} h-auto`}>
      <div className="px-6 py-4 pb-10">
        <p className="text-lg text-white font-somatic">{label}</p>
        <p className="text-2xl tracking-wide text-white">{info}</p>
      </div>

      {chart && (
        <div className="w-full h-full">
          <ResponsiveLine
            data={data}
            margin={{ top: 80, right: 0, bottom: 20, left: 0 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: 'orange_red' }}
            enablePoints={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
          />
        </div>
      )}
    </div>
  );
}
