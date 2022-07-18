import { StatusBar } from "expo-status-bar";
import LogIn from "./src/screens/Auth/LogIn";
import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import { AuthContextProvider, useAuthContext } from "./src/context/AuthContext";

export type AuthStackParams = {
  Home: { title: string };
};

export type StackParams = {
  LogIn: { title: string };
  SignIn: { title: string };
  SignUp: { title: string };
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const Stack = createNativeStackNavigator<StackParams>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
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
        animation: "none",
      }}
    >
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export function App() {
  const { isLoggedIn } = useAuthContext();
  // console.log("isLoggedIn ", isLoggedIn);
  const renderStack = () => {
    // console.log("isLoggedIn in App: ", isLoggedIn);
    return isLoggedIn ? <AuthStackScreen /> : <StackScreen />;
  };

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>{renderStack()}</NavigationContainer>
    </>
  );
}

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}
