import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

interface AuthContextProps {
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
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

const AuthContext = React.createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userToken, setUserToken] = React.useState<string | null>(null);
  // const [state, dispatch] = React.useReducer(
  //   (prevState: any, action: any) => {
  //     switch (action.type) {
  //       case "RESTORE_TOKEN":
  //         return {
  //           ...prevState,
  //           userToken: action.token,
  //           isLoading: false,
  //         };
  //       case "SIGN_IN":
  //         console.log("entro al switch");
  //         return {
  //           ...prevState,
  //           isLoggedIn: true,
  //           userToken: action.token,
  //         };
  //       case "SIGN_OUT":
  //         return {
  //           ...prevState,
  //           isLoggedIn: false,
  //           userToken: null,
  //         };
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isLoggedIn: true,
  //     userToken: null,
  //   }
  // );

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoggedIn(true);
    // marchesitos wifi;
    const signInUrl = "http:/192.168.1.117:8000/api/v1/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(signInUrl, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(async (data) => {
        setUserToken(data.token);
        await AsyncStorage.setItem("token", data.token);
        // dispatch({ type: "SIGN_IN", token: data.token });
      })
      .catch((error) => {
        alert("Error signing up: " + error);
      });
  };

  const signOut = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("token");
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
