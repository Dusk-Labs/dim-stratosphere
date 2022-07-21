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
import Movies from "./src/screens/Movies";
import Shows from "./src/screens/Shows";
import Nav from "./src/components/Nav";
import DashdoardIcon from "./src/components/icons/DashdoardIcon";
import DownloadIcon from "./src/components/icons/DownloadIcon";
import SearchIcon from "./src/components/icons/SearchIcon";
import SettingsIcon from "./src/components/icons/SettingsIcon";
import TabMenu from "./src/components/TabMenu";
import { useEffect, useState } from "react";
import RigthDrawer from "./src/components/RigthDrawer";
import { View } from "react-native";

export type MainStackParams = {
  Tab?: { title: string };
  Settings?: { title: string };
  Movies?: { title: string };
  Shows?: { title: string };
  FilterSliderScreens?: { title: string };
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
  Movies: { title: string };
  Shows: { title: string };
};

export type FilterSliderStackParams = {
  //MoviesIn: { title: string };
  TabStackScreens: { title: string };
};

const DrawerStack = createDrawerNavigator<MainStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const MainStack = createNativeStackNavigator<MainStackParams>();
const Tab = createBottomTabNavigator<TabStackParams>();
const FilterSliderStack = createDrawerNavigator<FilterSliderStackParams>();

const FilterSliderScreens = () => {
  const { route } = useAuthContext();
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    if (route === "Movies" || route === "Shows") {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [route]);
  return (
    <FilterSliderStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "rgba(14, 13, 11, 1)",
        },
      }}
      drawerContent={(props) => <RigthDrawer {...props} />}
    >
      <FilterSliderStack.Screen
        name="TabStackScreens"
        component={TabStackScreens}
        options={{ swipeEnabled: enable }}
      />
    </FilterSliderStack.Navigator>
  );
};

const TabStackScreens = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabMenu {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(37, 37, 37, 1)",
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Downloads" component={Downloads} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen name="Shows" component={Shows} />
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

const DrawerStackScreens = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "rgba(14, 13, 11, 1)",
        },
      }}
      drawerContent={(props) => <Nav {...props} />}
    >
      <DrawerStack.Screen
        name="FilterSliderScreens"
        component={FilterSliderScreens}
      />
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
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </View>
  );
}
