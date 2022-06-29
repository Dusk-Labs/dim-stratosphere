import { StatusBar } from "expo-status-bar";
import LogIn from "./src/screens/Auth/LogIn";
import * as React from "react";
import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";

export type StackParams = {
  Home: { title: string };
};

export type AuthStackParams = {
  LogIn: { title: string };
  SignIn: { title: string };
  SignUp: { title: string };
};

const Stack = createNativeStackNavigator<StackParams>();

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="LogIn" component={LogIn} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const renderStack = () => {
  const isLoggedIn = false;
  if (isLoggedIn) return <StackScreen />;
  return <AuthStackScreen />;
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>{renderStack()}</NavigationContainer>
    </>
  );
}
