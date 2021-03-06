import { RedoOutlined } from '@ant-design/icons';
import { Button, ButtonGroup, RadialProgress } from '@tastiest-io/tastiest-ui';
import { useHorusSWR } from '@tastiest-io/tastiest-utils';
import { AuthContext } from 'contexts/auth';
import { Duration } from 'luxon';
import React, { useContext } from 'react';

export default function ServerStats() {
  const { token } = useContext(AuthContext);
  const { data } = useHorusSWR<any>('/admin/server/system-stats', token, {
    refreshInterval: 5000,
  });

  const uptime = Duration.fromMillis(1000 * (data?.os?.uptime ?? 0)).toFormat(
    `d'D' h'H' m'M'`,
  );

  return (
    <div className="flex flex-col justify-between gap-6 h-full p-4 bg-white rounded-lg shadow-lg">
      <h4 className="font-medium text-center">Tastiest Backend</h4>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Uptime</td>
            <td className="text-right font-mono">{uptime}</td>
          </tr>

          <tr>
            <td>Public IP</td>
            <td className="text-right font-mono">{data?.os?.ip}</td>
          </tr>
        </tbody>
      </table>

      <div className="w-full">
        <ButtonGroup>
          <Button
            wide
            disabled
            color="secondary"
            size="tiny"
            suffix={<RedoOutlined />}
          >
            PM2
          </Button>

          <Button
            wide
            disabled
            color="danger"
            size="tiny"
            suffix={<RedoOutlined />}
          >
            Reboot
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex justify-center flex-grow items-center">
        <div className="flex flex-col justify-center h-24 w-24">
          <RadialProgress pc={data?.cpu ?? 0} />
          <span className="mt-2 text-center text-base">CPU</span>
        </div>

        <div className="flex flex-col justify-center h-24 w-24">
          <RadialProgress pc={data?.memory?.usedMemPercentage ?? 0} />
          <span className="mt-2 text-center text-base">Memory</span>
        </div>
      </div>
    </div>
  );
}
