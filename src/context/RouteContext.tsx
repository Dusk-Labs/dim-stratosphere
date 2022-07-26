import React, { useState, useContext, ReactElement } from "react";

export type RouteContextProps = {
  route: string;
  setRoute: (value: string) => void;
};

type RouteProviderProps = {
  children: ReactElement;
};

export const RouteContext = React.createContext<RouteContextProps>(
  {} as RouteContextProps
);

export const RouteContextProvider = ({ children }: RouteProviderProps) => {
  const [route, setRoute] = useState("Dashboard");

  return (
    <RouteContext.Provider
      value={{
        route,
        setRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

// hook to get the RouteContext
export const useRouteContext = () => {
  return useContext(RouteContext) as RouteContextProps;
};
