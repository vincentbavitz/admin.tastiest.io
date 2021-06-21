import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { UI } from '../constants';

export function useScreenSize() {
  const { width } = useWindowSize();

  // Default to mobile view
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHuge, setIsHuge] = useState(false);

  useEffect(() => {
    const _isMobile = width <= UI.MOBILE_BREAKPOINT;
    const _isTablet =
      width > UI.MOBILE_BREAKPOINT && width <= UI.TABLET_BREAKPOINT;
    const _isDesktop = width > UI.TABLET_BREAKPOINT;
    const _isHuge = width > UI.DESKTOP_BREAKPOINT;

    if (isMobile !== _isMobile) setIsMobile(_isMobile);
    if (isTablet !== _isTablet) setIsTablet(_isTablet);
    if (isDesktop !== _isDesktop) setIsDesktop(_isDesktop);
    if (isHuge !== _isHuge) setIsHuge(_isHuge);
  }, [width]);

  return { isMobile, isTablet, isDesktop, isHuge };
}
