// Get cutomer events
// Get IDs like this https://a.klaviyo.com/api/v2/people/search?email=vincent@bavitz.org&api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf
// https://a.klaviyo.com/api/v1/person/01F7GJRAW02J07TMDVKYZ7Y5PS/metrics/timeline?api_key=pk_9709c4e5fd47f4c60483f956eff6d00ddf&count=100&sort=desc

import {
  CodeOutlined,
  DownOutlined,
  EditOutlined,
  LaptopOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import {
  Button,
  Dropdown,
  InfoCard,
  Modal,
  StatusOrb,
  Switch,
  Tooltip,
  useMap,
} from '@tastiest-io/tastiest-ui';
import {
  PAYMENTS,
  postFetch,
  RestaurantCommissionStructure,
  RestaurantData,
  RestaurantDataApi,
  RestaurantDataMode,
  titleCase,
} from '@tastiest-io/tastiest-utils';
import BlockTemplate from 'components/blocks/BlockTemplate';
import BookingSlotsBlock from 'components/blocks/BookingSlotsBlock';
import QuietTimesBlock from 'components/blocks/QuietTimesBlock';
// import 'mapbox-gl/dist/mapbox-gl.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import { SetRestaurantCommissionParams } from 'pages/api/setRestaurantCommission';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import { Slider } from 'rsuite';
import { LocalEndpoint } from 'types/api';
import { firebaseAdmin } from 'utils/firebaseAdmin';

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>,
) => {
  // Ensure user is authenticated
  const cookieToken = nookies.get(context)?.token;

  // If no user, redirect to login
  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const restaurantId = String(context.params.restaurant);
  if (!restaurantId?.length) {
    return {
      redirect: {
        destination: `/restaurants`,
        permanent: false,
      },
    };
  }

  const restaurantDataApi = new RestaurantDataApi(firebaseAdmin, restaurantId);
  const restaurantData = await restaurantDataApi.getRestaurantData();

  if (!restaurantData) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return { props: { restaurantData } };
};

function Restaurant(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { restaurantData } = props;
  const displayLocation = restaurantData.details.location?.displayLocation;

  useMap('map', {
    lat: restaurantData.details.location.lat,
    lng: restaurantData.details.location.lon,
    zoom: 12,
    pitch: 0,
    markers: [
      {
        lat: restaurantData.details.location.lat,
        lng: restaurantData.details.location.lon,
      },
    ],
  });

  return (
    <div>
      <div className="text-xl pb-1 border-b-2 mb-4">
        {restaurantData.details.name}
        {displayLocation ? ` - ${displayLocation}` : null}
      </div>

      <div className="flex pb-10 flex-wrap gap-4">
        <div
          style={{ height: 'min-content' }}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InfoCard
            color="primary"
            label="Total Earned"
            compact={true}
            isLoading={false}
            polyfillInfo={'£00.00'}
            info={`£`}
          />

          <InfoCard
            color="primary"
            label="Total Revenue"
            compact={true}
            isLoading={false}
            polyfillInfo={'£00.00'}
            info={`£`}
          />

          <InfoCard
            color="alt-1"
            label="Followers"
            compact={true}
            isLoading={false}
            polyfillInfo={'£00.00'}
            info={restaurantData.metrics?.followers?.length ?? 0}
          />
        </div>

        <div
          id="map"
          style={{ width: '400px', maxWidth: '80vw', height: '400px' }}
          className="shadow-lg overflow-hidden rounded-xl"
        ></div>

        {/* <CustomerProfileSection profile={profile} /> */}
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex flex-1 flex-col gap-4">
          <BookingSlotsBlock restaurantData={restaurantData} />
          <QuietTimesBlock restaurantData={restaurantData} />
        </div>

        <div className="flex-1 text-base">
          <BlockTemplate theme="primary" headerless>
            <div className="flex flex-col space-y-4">
              <ModeRow restaurantData={restaurantData} />
              <CommissionRow restaurantData={restaurantData} />
              <ShouldFallbackRow restaurantData={restaurantData} />
            </div>
          </BlockTemplate>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  restaurantData: Partial<RestaurantData>;
}

const ModeRow = (props: RowProps) => {
  const { restaurantData } = props;

  const initialMode = restaurantData.details?.mode ?? RestaurantDataMode.TEST;
  const [mode, setMode] = useState<RestaurantDataMode>(initialMode);
  const [attemptedMode, setAttemptedMode] = useState<RestaurantDataMode>(
    initialMode,
  );

  const [showModal, setShowModal] = useState(false);

  const TriggerIcon = () =>
    mode === RestaurantDataMode.TEST ? (
      <CodeOutlined />
    ) : mode === RestaurantDataMode.DEMO ? (
      <LaptopOutlined />
    ) : mode === RestaurantDataMode.LIVE ? (
      <StatusOrb status="online" />
    ) : null;

  const attemptChangeMode = (_mode: RestaurantDataMode) => {
    setAttemptedMode(_mode);
    setShowModal(true);
  };

  const cancelChangeMode = () => {
    setAttemptedMode(mode);
    setShowModal(false);
  };

  const confirmChangeMode = async () => {
    setMode(attemptedMode);
    setShowModal(false);
    return null;
  };

  return (
    <>
      <Modal
        title="Change data mode"
        size="small"
        show={showModal}
        close={cancelChangeMode}
      >
        <div className="text-base">
          Are you sure you want to change the restaurant's data-mode to{' '}
          <b className="font-bold font-mono">{attemptedMode}</b>?
        </div>

        <ol className="ml-6 mt-4 list-outside list-decimal">
          <li className="mb-2">
            <b className="font-mono font-medium bg-green-200 px-1 rounded">
              LIVE
            </b>{' '}
            will make all of its posts public.
          </li>
          <li className="mb-2">
            <b className="font-mono font-medium bg-yellow-200 px-1 rounded">
              TEST
            </b>{' '}
            is strictly for development.
          </li>
          <li className="mb-2">
            <b className="font-mono font-medium bg-pink-200 px-1 rounded">
              DEMO
            </b>{' '}
            is used for sandboxed accounts for onboarding demos.
          </li>
        </ol>
        <div className="flex justify-end space-x-2 mt-6">
          <Button color="light" onClick={cancelChangeMode}>
            Cancel
          </Button>
          <Button onClick={confirmChangeMode}>Confirm</Button>
        </div>
      </Modal>

      <div className="flex items-end justify-between">
        <div>Mode</div>

        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex items-center space-x-4 px-4 py-1 border rounded-full cursor-pointer">
              <TriggerIcon />
              <div>{titleCase(mode)}</div>
              <DownOutlined className="text-xs" />
            </div>
          </Dropdown.Trigger>

          <Dropdown.Item
            onClick={() => attemptChangeMode(RestaurantDataMode.LIVE)}
            selected={mode === RestaurantDataMode.LIVE}
            icon={<StatusOrb status="online" />}
          >
            Live
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => attemptChangeMode(RestaurantDataMode.TEST)}
            selected={mode === RestaurantDataMode.TEST}
            icon={<CodeOutlined />}
          >
            Test
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => attemptChangeMode(RestaurantDataMode.DEMO)}
            selected={mode === RestaurantDataMode.DEMO}
            icon={<LaptopOutlined />}
          >
            Demo
          </Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
};

const ShouldFallbackRow = (props: RowProps) => {
  const { restaurantData } = props;

  const [shouldFallback, setShouldFallback] = useState(
    restaurantData.settings?.shouldFallbackToOpenTimes ?? false,
  );

  return (
    <div className="flex items-end justify-between">
      <div className="flex items-center space-x-1">
        <div>Fallback to Open Times </div>

        <Tooltip content="Use the open-times when a booking system sync fails.">
          <div className="h-5 w-5 flex items-center justify-center font-mono bg-gray-200 text-gray-400 cursor-pointer rounded-full">
            ?
          </div>
        </Tooltip>
      </div>

      <Switch checked={shouldFallback} onChange={setShouldFallback} />
    </div>
  );
};

const CommissionRow = (props: RowProps) => {
  const { restaurantData } = props;

  const [
    savedCommission,
    setSavedCommission,
  ] = useState<RestaurantCommissionStructure | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [hasModified, setHasModified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // prettier-ignore
  const commission: RestaurantCommissionStructure = {
    defaultRestaurantCut: savedCommission?.defaultRestaurantCut ?? restaurantData?.financial?.commission?.defaultRestaurantCut ?? PAYMENTS.RESTAURANT_CUT_DEFAULT_PC,
    followersRestaurantCut: savedCommission?.followersRestaurantCut ?? restaurantData?.financial?.commission?.followersRestaurantCut ?? PAYMENTS.RESTAURANT_CUT_FOLLOWERS_PC,
  };

  const [restaurantDefaultCut, setRestaurantDefaultCut] = useState(
    commission.defaultRestaurantCut,
  );

  const [restaurantFollowersCut, setRestaurantFollowersCut] = useState(
    commission.followersRestaurantCut,
  );

  const [tastiestDefaultCut, setTastiestDefaultCut] = useState(
    100 - commission.defaultRestaurantCut,
  );

  const [tastiestFollowersCut, setTastiestFollowersCut] = useState(
    100 - commission.followersRestaurantCut,
  );

  const updateRestaurantDefaultCut = (value: number) => {
    setHasModified(true);
    setRestaurantDefaultCut(value);
    setTastiestDefaultCut(100 - value);
  };

  const updateRestaurantFollowersCut = (value: number) => {
    setHasModified(true);
    setRestaurantFollowersCut(value);
    setTastiestFollowersCut(100 - value);
  };

  const updateTastiestDefaultCut = (value: number) => {
    setHasModified(true);
    setTastiestDefaultCut(value);
    setRestaurantDefaultCut(100 - value);
  };

  const updateTastiestFollowersCut = (value: number) => {
    setHasModified(true);
    setTastiestFollowersCut(value);
    setRestaurantFollowersCut(100 - value);
  };

  const save = async () => {
    setSaving(true);
    setError(null);

    const _commission: RestaurantCommissionStructure = {
      defaultRestaurantCut: restaurantDefaultCut,
      followersRestaurantCut: restaurantFollowersCut,
    };

    const { success, error } = await postFetch<SetRestaurantCommissionParams>(
      LocalEndpoint.SET_RESTAURANT_COMMISSION,
      {
        restaurantId: restaurantData.details.id,
        commission: _commission,
      },
    );

    setSaving(false);
    setHasModified(false);
    setSavedCommission(_commission);
    if (success) setShowModal(false);
    if (error) setError(error);
  };

  const resetToDefaults = () => {
    updateRestaurantDefaultCut(PAYMENTS.RESTAURANT_CUT_DEFAULT_PC);
    updateRestaurantFollowersCut(PAYMENTS.RESTAURANT_CUT_FOLLOWERS_PC);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">Commission</div>
        <div
          style={{ lineHeight: '0.75rem' }}
          className="flex items-center border rounded-full gap-2"
        >
          <Tooltip
            placement="top"
            content={`The commission is ${commission.defaultRestaurantCut}% by default and ${commission.followersRestaurantCut}% for followers.`}
          >
            <div className="pl-4 pr-2 select-none">
              <span className="font-mono">
                D-
                {commission.defaultRestaurantCut}% F-
                {commission.followersRestaurantCut}%
              </span>
            </div>
          </Tooltip>

          <div className="h-full border-l">
            <EditOutlined
              onClick={() => setShowModal(true)}
              className="py-2 hover:bg-secondary hover:text-white duration-300 rounded-r-full pr-4 pl-2 text-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Modal
        title="Commission Structure"
        show={showModal}
        close={() => setShowModal(false)}
      >
        <div style={{ width: '333px' }}>
          <div className="flex mt-4 items-center justify-between pb-2 space-x-4">
            <div className="text-base font-medium">
              Restaurant's default cut
            </div>
            <div className="text-base">{restaurantDefaultCut}%</div>
          </div>

          <Slider
            step={1}
            min={0}
            max={100}
            progress
            disabled={saving}
            value={restaurantDefaultCut}
            onChange={updateRestaurantDefaultCut}
          />

          <div className="flex mt-6 items-center justify-between pb-2 space-x-4">
            <div className="text-base font-medium">
              Restaurant's cut for followers
            </div>
            <div className="text-base">{restaurantFollowersCut}%</div>
          </div>

          <Slider
            step={1}
            min={0}
            max={100}
            progress
            disabled={saving}
            value={restaurantFollowersCut}
            onChange={updateRestaurantFollowersCut}
          />

          <div className="mt-6 border-b-2"></div>

          <div className="flex mt-6 items-center justify-between pb-2 space-x-4">
            <div className="text-base font-medium">Tastiest's default cut</div>
            <div className="text-base">{tastiestDefaultCut}%</div>
          </div>

          <Slider
            step={1}
            min={0}
            max={100}
            progress
            disabled={saving}
            value={tastiestDefaultCut}
            onChange={updateTastiestDefaultCut}
          />

          <div className="flex mt-6 items-center justify-between pb-2 space-x-4">
            <div className="text-base font-medium">
              Tastiest's cut for followers
            </div>
            <div className="text-base">{tastiestFollowersCut}%</div>
          </div>

          <Slider
            step={1}
            min={0}
            max={100}
            progress
            disabled={saving}
            value={tastiestFollowersCut}
            onChange={updateTastiestFollowersCut}
          />

          <div className="mt-6">
            {error ? (
              <div className="bg-danger bg-opacity-25 rounded-lg p-4">
                <p className="font-medium leading-none text-base">Error.</p>
                <p className="leading-none">{error}</p>
              </div>
            ) : null}

            <div className="flex items-center justify-between mt-6">
              <Tooltip placement="bottom" content="Reset to defaults">
                <UndoOutlined
                  onClick={saving ? null : resetToDefaults}
                  className="text-xl text-gray-500 duration-300 hover:text-primary"
                />
              </Tooltip>

              <div className="flex space-x-2">
                <div className="w-20">
                  <Button
                    wide
                    loading={saving}
                    disabled={!hasModified}
                    color="success"
                    onClick={save}
                  >
                    Save
                  </Button>
                </div>
                <Button color="light" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Restaurant;
