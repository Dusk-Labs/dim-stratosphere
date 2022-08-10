import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerStackScreens } from "./src/router/stacks/DrawerStackScreens";
import { AuthStackScreens } from "./src/router/stacks/AuthStackScreens";
import { AuthContextProvider, useAuthContext } from "./src/context/AuthContext";
import "react-native-gesture-handler";
import { View } from "react-native";
import { RouteContextProvider } from "./src/context/RouteContext";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { isLoggedIn } = useAuthContext();

  const renderStack = () => {
    return isLoggedIn ? (
      <RouteContextProvider>
        <DrawerStackScreens />
      </RouteContextProvider>
    ) : (
      <AuthStackScreens />
    );
  };

  const queryClient = new QueryClient();

  return (
    <>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{renderStack()}</NavigationContainer>
      </QueryClientProvider>
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
