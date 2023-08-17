import { useEffect, useState } from "react";
import { useRouteContext } from "../../context/RouteContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabStackScreens } from "./TabsStackScreens";
import { RigthDrawer } from "../../components/RigthDrawer";

type FilterSliderStackParams = {
  TabStackScreens: { title: string };
};

const FilterSliderStack = createDrawerNavigator<FilterSliderStackParams>();

export const FilterSliderStackScreens = () => {
  const { route } = useRouteContext();
  const [isSliderEnabled, setIsSliderEnabled] = useState<boolean>(false);

  useEffect(() => {
    route === "Library" ? setIsSliderEnabled(true) : setIsSliderEnabled(false);
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
      drawerContent={() => <RigthDrawer />}
    >
      <FilterSliderStack.Screen
        name="TabStackScreens"
        component={TabStackScreens}
        options={{ swipeEnabled: isSliderEnabled }}
      />
    </FilterSliderStack.Navigator>
  );
};
