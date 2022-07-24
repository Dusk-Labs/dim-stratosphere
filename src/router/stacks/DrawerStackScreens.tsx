import { createDrawerNavigator } from "@react-navigation/drawer";
import { FilterSliderStackScreens } from "./FilterSliderStackScreens";
import { Nav } from "./../../components/Nav";

export type MainStackParams = {
  Tab?: { title: string };
  Settings?: { title: string };
  Movies?: { title: string };
  Shows?: { title: string };
  FilterSliderScreens?: { title: string };
};

const DrawerStack = createDrawerNavigator<MainStackParams>();

export const DrawerStackScreens = () => {
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
        component={FilterSliderStackScreens}
      />
    </DrawerStack.Navigator>
  );
};
