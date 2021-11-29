/* eslint-disable react/display-name */
import {
  CheckOutlined,
  CloseOutlined,
  DesktopOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  Button,
  ButtonGroup,
  Modal,
  StatusOrb,
  Table,
  Tooltip,
} from '@tastiest-io/tastiest-ui';
import {
  dlog,
  RestaurantData,
  RestaurantDetails,
} from '@tastiest-io/tastiest-utils';
import { EmailTemplate } from '@tastiest-io/tastiest-utils/dist/types/email';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { LocalEndpoint } from 'types/api';

type EmailTemplateRow = {
  restaurant: Partial<RestaurantDetails>;
  template: EmailTemplate;
};

export default function EmailTemplatesTable() {
  const { data: restaurants } = useSWR<RestaurantData[]>(
    `${LocalEndpoint.GET_RESTAURANTS}`,
    {
      refreshInterval: 30000,
      initialData: null,
      refreshWhenHidden: true,
    },
  );

  const templates: EmailTemplateRow[] = useMemo(
    () =>
      restaurants
        ?.map(r =>
          Object.values(r?.email?.templates ?? {})?.map(template => ({
            template,
            restaurant: r.details,
          })),
        )
        .flat()
        .filter(row => Boolean(row)),
    [restaurants],
  );

  // By template ID.
  const [showPreviewId, setShowPreviewId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Mobile or desktop view mode.
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    if (restaurants) {
      setIsInitialLoading(false);
    }
  }, [restaurants]);

  const columns = [
    {
      id: 'restaurant',
      Header: 'Restaurant',
      width: '200',
      accessor: (row: EmailTemplateRow) => {
        return (
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <StatusOrb
                status={row.template.isApproved ? 'online' : 'warning'}
              />

              <Link href={`/restaurants/${row?.restaurant?.id}`}>
                <a className="font-medium hover:underline">
                  {row?.restaurant?.name}
                </a>
              </Link>
            </div>
            {/* <Link href={`/customers/${row.id}`}>
              <a className="text-sm opacity-75">{row.details.email}</a>
            </Link> */}
          </div>
        );
      },
    },
    {
      id: 'followers',
      Header: 'Followers',
      width: 80,
      accessor: (row: EmailTemplateRow) => {
        return <p></p>;
      },
    },
    {
      id: 'totalCovers',
      Header: 'Total Covers',
      width: 80,
      accessor: (row: EmailTemplateRow) => <p className=""></p>,
    },
    {
      id: 'preview',
      Header: '',
      width: 95,
      accessor: (row: EmailTemplateRow) => {
        return (
          <div className="pl-2">
            <Button
              onClick={() => setShowPreviewId(row.template.id)}
              size="tiny"
            >
              Preview
            </Button>
          </div>
        );
      },
    },
    {
      id: 'approval',
      Header: '',
      width: 95,
      accessor: (row: EmailTemplateRow) => {
        return (
          <div className="pl-2">
            {row.template.isApproved ? (
              <div className="text-xs select-none rounded-md py-1 bg-success text-light bg-opacity-75">
                <span className="px-4">Approved</span>
              </div>
            ) : (
              <div className="flex space-x-1">
                <Tooltip content="Approve template" placement="top">
                  <Button
                    color="success"
                    size="tiny"
                    prefix={<CheckOutlined className="py-1" />}
                    onClick={() => setShowPreviewId(row.template.id)}
                  ></Button>
                </Tooltip>

                <Tooltip content="Reject template" placement="top">
                  <Button
                    color="danger"
                    size="tiny"
                    prefix={<CloseOutlined className="py-1" />}
                    onClick={() => setShowPreviewId(row.template.id)}
                  ></Button>
                </Tooltip>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Update data depending on the column
  // const updateData = React.useMemo(
  //   () => (value: any, rowIndex: number, columnId: EditableBookingFields) => {
  //     console.log(`Updating '${columnId}' field on booking to ${value}`);
  //     setBookingField(columnId, value, bookings, rowIndex);
  //   },
  //   [bookings],
  // );

  const searchFunction = (query: string, data: RestaurantData[]) => {
    // prettier-ignore
    const result = data.filter(restaurantData => {
      return (
        restaurantData.details?.name?.toLowerCase().includes(query.toLowerCase()) ||
        restaurantData.details?.id?.toLowerCase().includes(query.toLowerCase())
      );
    });

    return result;
  };

  // Assign preview to iframe in the preview modal
  const previewFrameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (!previewFrameRef) {
        return;
      }

      const currentTemplate = templates?.find(
        t => t.template.id === showPreviewId,
      );

      dlog(
        'EmailTemplatesTable ➡️ previewFrameRef.current.src:',
        previewFrameRef.current,
      );

      if (currentTemplate) {
        const currentTemplateHtml = currentTemplate?.template.html ?? '';

        try {
          previewFrameRef.current.src =
            'data:text/html;charset=utf-8,' + escape(currentTemplateHtml);
        } catch {
          null;
        }
      }
    }, 500);
  }, [templates, showPreviewId]);

  return (
    <div className="text-xs mobile:text-base">
      <Table
        label="Upcoming Emails"
        columns={columns}
        data={templates ?? []}
        noDataLabel="No upcoming emails"
        searchFunction={searchFunction}
        isLoadingInitialData={isInitialLoading}
        paginateInterval={5}
      />

      <Modal
        title="Preview template"
        show={Boolean(showPreviewId)}
        close={() => setShowPreviewId(null)}
        size="large"
        preload
      >
        <div className="flex justify-end space-x-2 pb-4">
          <ButtonGroup shadow>
            <Button size="small">
              <MobileOutlined
                className="text-2xl"
                onClick={() => setViewport('mobile')}
              />
            </Button>
            <Button size="small" selected>
              <DesktopOutlined
                className="text-2xl"
                onClick={() => setViewport('mobile')}
              />
            </Button>
          </ButtonGroup>
        </div>
        <iframe
          style={{ width: '600px', height: '500px' }}
          ref={previewFrameRef}
        ></iframe>
      </Modal>
    </div>
  );
}
