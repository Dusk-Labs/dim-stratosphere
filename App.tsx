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
import { useEffect } from "react";

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
  let enable;
  useEffect(() => {
    if (route === "Movies" || route === "Shows") {
      enable = true;
    } else {
      enable = false;
    }
  });
  return (
    <FilterSliderStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "slide",
      }}
    >
      <FilterSliderStack.Screen
        name="TabStackScreens"
        component={TabStackScreens}
        options={{ swipeEnabled: enable }}
      />
      {/* <FilterSliderStack.Screen name="MoviesIn" component={Movies} /> */}
    </FilterSliderStack.Navigator>
  );
};

const TabStackScreens = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabMenu {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "rgba(234, 150, 62, 1)",
        tabBarStyle: {
          backgroundColor: "rgba(37, 37, 37, 1)",
          height: 60,
          borderTopColor: "rgba(37, 37, 37, 1)",
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => <DashdoardIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => <SearchIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Downloads}
        options={{
          tabBarIcon: ({ color, size }) => <DownloadIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} />,
        }}
      />
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
      }}
      drawerContent={(props) => <Nav {...props} />}
    >
      {/*       <DrawerStack.Screen name="Tab" component={TabStackScreens} />
       */}
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
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}
