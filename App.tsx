import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerStackScreens } from "./src/router/stacks/DrawerStackScreens";
import { AuthStackScreens } from "./src/router/stacks/AuthStackScreens";
import { AuthContextProvider, useAuthContext } from "./src/context/AuthContext";
import "react-native-gesture-handler";
import { View } from "react-native";
import { RouteContextProvider } from "./src/context/RouteContext";
import React from "react";
import * as NavigationBar from "expo-navigation-bar";

function App() {
  const { isLoggedIn } = useAuthContext();
  isLoggedIn
    ? NavigationBar.setBackgroundColorAsync("rgba(37, 37, 37, 1)")
    : NavigationBar.setBackgroundColorAsync("rgba(14, 13, 11, 1)");
  const renderStack = () => {
    return isLoggedIn ? (
      <RouteContextProvider>
        <DrawerStackScreens />
      </RouteContextProvider>
    ) : (
      <AuthStackScreens />
    );
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
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </View>
  );
}
