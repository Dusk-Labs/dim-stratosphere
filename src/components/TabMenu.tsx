import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import DashboardIcon from "./icons/DashdoardIcon";
import SettingsIcon from "./icons/SettingsIcon";
import SearchIcon from "./icons/SearchIcon";
import DownloadIcon from "./icons/DownloadIcon";
import { useRouteContext } from "../context/RouteContext";
import { rem } from "../../constants/units";

type TabMenuProps = {
  navigation: any;
};

export const TabMenu = ({ ...props }: TabMenuProps) => {
  const { route, setRoute } = useRouteContext();

  useEffect(() => {
    setRoute(
      props.navigation.getState().routes[props.navigation.getState().index].name
    );
  }, [props.navigation.getState()]);

  return (
    <View style={styles.tabManu}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Dashboard");
        }}
      >
        <DashboardIcon
          color={route === "Dashboard" ? "rgba(234, 150, 62, 1)" : "#7E7E7E"}
        />
        <Text style={route === "Dashboard" ? styles.goldenText : styles.text}>
          DashBoard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Search");
        }}
      >
        <SearchIcon
          color={route === "Search" ? "rgba(234, 150, 62, 1)" : "#7E7E7E"}
        />
        <Text style={route === "Search" ? styles.goldenText : styles.text}>
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Downloads");
        }}
      >
        <DownloadIcon
          color={route === "Downloads" ? "rgba(234, 150, 62, 1)" : "#7E7E7E"}
        />
        <Text style={route === "Downloads" ? styles.goldenText : styles.text}>
          Downloads
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Settings");
        }}
      >
        <SettingsIcon
          color={route === "Settings" ? "rgba(234, 150, 62, 1)" : "#7E7E7E"}
        />
        <Text style={route === "Settings" ? styles.goldenText : styles.text}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabManu: {
    backgroundColor: "rgba(37, 37, 37, 1)",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
    height: 60,
  },
  textNav: {
    height: rem,
    overflow: "hidden",
    color: "rgba(126, 126, 126, 1)",
    fontSize: 12,
  },
  tabManuNav: {
    height: rem * 4,
    backgroundColor: "rgba(37, 37, 37, 1)",
    width: "100%",
    marginTop: rem,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  buttonNav: {
    marginLeft: rem * 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    color: "rgba(126, 126, 126, 1)",
    fontSize: 12,
  },
  goldenText: {
    color: "rgba(234, 150, 62, 1)",
    fontSize: 12,
  },
  button: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
