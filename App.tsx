import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LogIn from "./components/LogIn";
import * as React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParams = {
  LogIn: {
    title: string;
  };
  SignIn: {
    title: string;
  };
  SignUp: {
    title: string;
  };
};

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        {/* @ts-ignore */}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
