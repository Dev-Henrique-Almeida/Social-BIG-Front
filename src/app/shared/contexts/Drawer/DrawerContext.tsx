"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { IChildrenProps, IDrawerContexData } from "../../@types";

const DrawerContext = createContext({} as IDrawerContexData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
