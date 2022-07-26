import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactElement, useContext, useEffect, useState } from "react";

export type AuthContextProps = {
  signIn: ({ userToken }: { userToken: string }) => Promise<void>;
  signOut: () => void;
  isLoggedIn: boolean;
  userToken: string | null;
};

type AuthProviderProps = {
  children: ReactElement;
};

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then((userToken) => {
      if (userToken) {
        setIsLoggedIn(true);
        setUserToken(userToken);
      }
    });
  }, []);

  const signIn = async ({ userToken }: { userToken: string }) => {
    console.log("2 userToken", userToken);
    await AsyncStorage.setItem("userToken", userToken).then(() => {
      setUserToken(userToken);
      setIsLoggedIn(true);
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken").then(() => {
      setIsLoggedIn(false);
      setUserToken(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLoggedIn,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook to get the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext) as AuthContextProps;
};
