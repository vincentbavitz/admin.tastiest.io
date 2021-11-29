import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/router';
import LayoutAuth from './LayoutAuth';
import LayoutDefault from './LayoutDefault';
import LayoutSupportRequest from './LayoutSupportRequest';

export enum Layouts {
  DEFAULT = 'default',
  AUTH = 'auth',
  SUPPORT_REQUEST = 'support-request',
}

const layouts = {
  [Layouts.DEFAULT]: LayoutDefault,
  [Layouts.AUTH]: LayoutAuth,
  [Layouts.SUPPORT_REQUEST]: LayoutSupportRequest,
};

type ChildrenWithLayout = { layout?: Layouts } & NextComponentType<
  NextPageContext
>;

export type LayoutProps<T = any> = {
  pageProps: T;
  router: Router;
  children: ChildrenWithLayout;
};

const LayoutHandler = (props: LayoutProps) => {
  // To get the text value of the assigned layout of each component
  const Layout = layouts[props.children?.layout];

  // If we have a registered layout render children with said layout
  if (Layout != null) {
    return <Layout {...props}>{props.children}</Layout>;
  }

  // If not render children with fragment
  return <LayoutDefault {...props}>{props.children}</LayoutDefault>;
};

export default LayoutHandler;
