import { StatusBar } from "expo-status-bar";
import LogIn from "./src/screens/Auth/LogIn";
import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/screens/Dashboard";
import { AuthContextProvider, useAuthContext } from "./src/context/AuthContext";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Downloads from "./src/screens/Downloads";
import Search from "./src/screens/Search";
import Settings from "./src/screens/Settings";

export type MainStackParams = {
  Tab: { title: string };
  Dashboard: { title: string };
};

export type AuthStackParams = {
  LogIn: { title: string };
  SignIn: { title: string };
  SignUp: { title: string };
};

export type TabStackParams = {
  Dashboard: { title: string };
  Search: { title: string };
  Downloads: { title: string };
  Settings: { title: string };
};

const DrawerStack = createDrawerNavigator<MainStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();
const Tab = createBottomTabNavigator<TabStackParams>();

const TabStackScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Downloads" component={Downloads} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <AuthStack.Screen name="LogIn" component={LogIn} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const MainStackScreens = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <MainStack.Screen name="Dashboard" component={Dashboard} />
    </MainStack.Navigator>
  );
};

const DrawerStackScreens = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
      }}
    >
      <DrawerStack.Screen name="Tab" component={TabStackScreens} />
      <DrawerStack.Screen name="Dashboard" component={Dashboard} />
    </DrawerStack.Navigator>
  );
};
export function App() {
  const { isLoggedIn } = useAuthContext();

  const renderStack = () => {
    //return isLoggedIn ? <MainStackScreens /> : <AuthStackScreens />;
    return true ? <DrawerStackScreens /> : <AuthStackScreens />;
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
