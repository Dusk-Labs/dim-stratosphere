import { StatusBar } from "expo-status-bar";
import LogIn from "./src/screens/Auth/LogIn";
import * as React from "react";
import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./src/context/AuthContext";

export type AuthStackParams = {
  Home: { title: string };
};

export type StackParams = {
  LogIn: { title: string };
  SignIn: { title: string };
  SignUp: { title: string };
};
<<<<<<< HEAD
const Stack = createNativeStackNavigator<StackParams>();
=======
>>>>>>> 3df128b965c76ce484e4863e1cc7c112fbde545b

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const Stack = createNativeStackNavigator<StackParams>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          console.log("entro al switch");
          return {
            ...prevState,
            isLoggedIn: true,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoggedIn: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLoggedIn: true,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await SecureStore.getItemAsync('userToken');
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => {
        // marchesitos;
        const signInUrl = "http:/192.168.1.117:8000/api/v1/auth/login";
        // chipis;
        // const signInUrl = "http:/192.168.0.114:8000/api/v1/auth/login";
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
          .then((data) => {
            // dispatch action to context here
            dispatch({ type: "SIGN_IN", token: data.token });
          })
          .catch((error) => {
            alert("Error signing up: " + error);
          });

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  const renderStack = () => {
    return state.isLoggedIn ? <AuthStackScreen /> : <StackScreen />;
  };

  return (
    <>
      <AuthContext.Provider value={authContext}>
        <StatusBar style="light" />
        <NavigationContainer>{renderStack()}</NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
