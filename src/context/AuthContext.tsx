import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";

export interface AuthContextProps {
  signIn: ({ token }: { token: string }) => Promise<void>;
  signOut: () => void;
  signUp: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  isLoggedIn: boolean;
  userToken: string | null;
}

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        setIsLoggedIn(true);
        setUserToken(token);
      }
    });
  }, []);

  const signIn = async ({ token }: { token: string }) => {
    await AsyncStorage.setItem("token", token).then(() => {
      setUserToken(token);
      setIsLoggedIn(true);
    });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token").then(() => {
      setIsLoggedIn(false);
      setUserToken(null);
    });
  };

  // TODO
  const signUp = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoggedIn(true);
    setUserToken("token");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
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
