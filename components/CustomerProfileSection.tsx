import { dlog } from '@tastiest-io/tastiest-utils';
import { TastiestCustomerProfile } from 'pages/api/getCustomerProfile';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

interface Props {
  profile: TastiestCustomerProfile;
}

type ProfileKeyMap = { title?: string; label?: string; element?: JSX.Element };

export function CustomerProfileSection(props: Props) {
  const { profile } = props;

  const profileKeyLabelMap = useMemo(
    () =>
      [
        {
          title: 'Details',
        },
        {
          label: 'First Name',
          element: <>{profile?.firstName}</>,
        },
        {
          label: 'Last Name',
          element: <>{profile?.lastName}</>,
        },
        {
          label: 'Email',
          element: profile?.email ? (
            <a href={`mailto:${profile?.email}`} className="hover:underline">
              {profile.email}
            </a>
          ) : null,
        },
        {
          label: 'Phone Number',
          element: profile?.userData?.details?.mobile ? (
            <a
              href={`tel:${profile?.userData?.details?.mobile}`}
              className="hover:underline"
            >
              {profile?.userData?.details?.mobile}
            </a>
          ) : null,
        },
        { element: <div className="pb-2"></div> },
        {
          label: 'User ID',
          element: profile?.userId ? (
            <a
              href={`https://console.firebase.google.com/u/0/project/tastiest-dishes/firestore/data/~2Fusers~${profile?.userId}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:underline"
            >
              {profile?.userId}
            </a>
          ) : null,
        },
        {
          label: 'Platform',
          element: <>{profile?.platform}</>,
        },
        {
          label: 'Device',
          element: <>{profile?.device}</>,
        },
        { element: <div className="pb-2"></div> },
        {
          title: 'Location',
        },

        {
          label: 'Country',
          element: <>{profile?.country}</>,
        },

        {
          label: 'Region',
          element: <>{profile?.region}</>,
        },

        {
          label: 'City',
          element: <>{profile?.city}</>,
        },
        {
          label: 'Postcode',
          element: <>{profile?.postalCode}</>,
        },
        {
          label: 'Street Address',
          element: <>{profile?.address.address}</>,
        },
        {
          label: 'Timezone',
          element: <>{profile?.timezone}</>,
        },
      ] as ProfileKeyMap[],
    [profile],
  );

  dlog('[customer] ➡️ profile:', profile);

  return (
    <div className="w-auto px-4 py-4 bg-white rounded-md">
      <table style={{ minWidth: '350px' }} className="w-auto">
        <tbody>
          {profileKeyLabelMap.map(item => (
            <tr key={uuid()}>
              {item.title && (
                <td className="pr-10 text-lg font-medium text-primary font-somatic">
                  {item.title}
                </td>
              )}

              {item.label && (
                <td className="pr-10 font-medium">{item.label}</td>
              )}
              {item.element && <td className="text-right">{item.element}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
