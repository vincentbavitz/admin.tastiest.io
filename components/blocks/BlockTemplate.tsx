import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface Props {
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
  title?: string;
  children: ReactNode;
  icon?: React.ForwardRefExoticComponent<any>;
  onIconClick?: () => void;
  headerless?: boolean;
}

export default function BlockTemplate(props: Props) {
  const {
    title,
    theme = 'primary',
    children,
    onIconClick = () => null,
    headerless,
  } = props;

  const Icon = props.icon;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {headerless ? null : (
        <div
          className={clsx(
            'flex items-center justify-between w-full py-2 px-4 mb-2 rounded-t-lg',
            `bg-${theme}`,
          )}
        >
          <div className="text-lg font-medium text-white">{title}</div>

          {Icon ? (
            <div>
              <Icon
                onClick={onIconClick}
                className="text-lg text-gray-200 duration-300 cursor-pointer hover:text-white"
              />
            </div>
          ) : null}
        </div>
      )}

      <div className={clsx('px-4', headerless ? 'py-4' : 'pb-2')}>
        {children}
      </div>
    </div>
  );
}
