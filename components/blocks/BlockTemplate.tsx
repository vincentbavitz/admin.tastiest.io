import React, { ReactNode } from 'react';

interface Props {
  title: string;
  theme:
    | 'primary'
    | 'primary-1'
    | 'primary-2'
    | 'secondary'
    | 'secondary-1'
    | 'secondary-2'
    | 'alt'
    | 'alt-1'
    | 'alt-2';
  icon: ReactNode;
  children: ReactNode;
}

export default function BlockTemplate(props: Props) {
  const { icon, children } = props;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between w-full py-1 pl-2 mb-2 rounded-t-lg bg-alt-1">
        <div className="text-lg font-medium text-white">Quiet Times</div>
        <div>{icon}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}
