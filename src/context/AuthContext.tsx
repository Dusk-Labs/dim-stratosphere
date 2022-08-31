import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactElement, useContext, useEffect, useState } from "react";

export type AuthContextProps = {
  signIn: ({
    userToken,
    host,
  }: {
    userToken: string;
    host: string;
  }) => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
  userToken: string | null;
  host: string;
  setHost: (value: string) => void;
};

type AuthProviderProps = {
  children: ReactElement;
};

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [host, setHost] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userToken").then((userToken) => {
      if (userToken) {
        setIsLoggedIn(true);
        setUserToken(JSON.parse(userToken));
        AsyncStorage.getItem("host").then((host) => {
          setHost(host as string);
        });
      }
    });
  }, []);

  const signIn = async ({
    userToken,
    host,
  }: {
    userToken: string;
    host: string;
  }) => {
    console.log("signing in: ", host);
    await AsyncStorage.setItem("userToken", userToken).then(() => {
      setUserToken(userToken);
      setIsLoggedIn(true);
    });
    await AsyncStorage.setItem("host", host).then(() => {
      setHost(host);
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken").then(() => {
      setIsLoggedIn(false);
      setUserToken(null);
    });
    await AsyncStorage.removeItem("host").then(() => {
      setHost("");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLoggedIn,
        userToken,
        host,
        setHost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook to get the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context as AuthContextProps;
};
