import React, { useState, useEffect, createContext } from 'react'

export const vuroxContext = createContext()
export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
export const VuroxContextProvider = (props) => {
    const [menutoggle, setMenutoggle] = props.pageWidth > 700 ? useState(false) : useState(true)  
    const [initClosed, setInitClosed] = useState(true)
    const toggleMenu = () => {
        setMenutoggle(!menutoggle)
    }
    return (
        <vuroxContext.Provider value={{
                menuInitState: initClosed, 
                menuState:menutoggle, 
                toggleMenu: toggleMenu
            }}>
            {props.children}
        </vuroxContext.Provider>
    )
}
