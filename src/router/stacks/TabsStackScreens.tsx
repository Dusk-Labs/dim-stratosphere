import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabMenu } from "../../components/TabMenu";
import { Dashboard } from "../../screens/Dashboard";
import { Downloads } from "../../screens/Downloads";
import { Library } from "../../screens/Library";
import { Search } from "../../screens/Search";
import { Settings } from "../../screens/Settings";
import { MediaPage } from "../../screens/Media/MediaPage";

export type TabStackParams = {
  Dashboard: { title: string };
  Search: { title: string };
  Downloads: { title: string };
  Settings: { title: string };
  Library: { title: string };
  MediaPage: { title: string };
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
        name="Library"
        component={Library}
        options={{
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen name="MediaPage" component={MediaPage} />
    </Tab.Navigator>
  );
};
