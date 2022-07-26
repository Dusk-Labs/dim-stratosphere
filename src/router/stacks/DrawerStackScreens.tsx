import { createDrawerNavigator } from "@react-navigation/drawer";
import { FilterSliderStackScreens } from "./FilterSliderStackScreens";
import { Nav } from "./../../components/Nav";
import { useRouteContext } from "../../context/RouteContext";
import { useState,useEffect } from "react";

export type MainStackParams = {
  Tab?: { title: string };
  Settings?: { title: string };
  Movies?: { title: string };
  Shows?: { title: string };
  FilterSliderScreens?: { title: string };
};

const DrawerStack = createDrawerNavigator<MainStackParams>();

export const DrawerStackScreens = () => {
  const { route } = useRouteContext();
  const [isSliderEnabled, setIsSliderEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (route === "Settings" || route === "Search") {
      setIsSliderEnabled(false);
    } else {
      setIsSliderEnabled(true);
    }
  }, [route]);
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
        options={{swipeEnabled:isSliderEnabled}}
      />
    </DrawerStack.Navigator>
  );
};
