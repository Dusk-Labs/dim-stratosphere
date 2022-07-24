import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabMenu } from "../../components/TabMenu";
import { Dashboard } from "../screens/Dashboard";
import { Downloads } from "../screens/Downloads";
import { Movies } from "../screens/Movies";
import { Search } from "../screens/Search";
import { Settings } from "../screens/Settings";
import { Shows } from "../screens/Shows";

export type TabStackParams = {
  Dashboard: { title: string };
  Search: { title: string };
  Downloads: { title: string };
  Settings: { title: string };
  Movies: { title: string };
  Shows: { title: string };
};

const Tab = createBottomTabNavigator<TabStackParams>();

export const TabStackScreens = () => {
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
