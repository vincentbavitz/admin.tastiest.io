import React, { ReactNode } from 'react';

interface Props {
  label: string;
  subLabel?: string;
  children?: ReactNode;
}

export default function PageHeader(props: Props) {
  const { label, subLabel, children } = props;

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <h3 className="text-2xl leading-none font-medium text-primary">
          {label}
        </h3>

        {children}
      </div>

      {subLabel ? (
        <div className="text-sm mt-2 font-thin">{subLabel}</div>
      ) : null}
    </div>
  );
}
