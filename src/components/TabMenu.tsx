import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
const dashboardIcon = require("../../assets/dashBoardIcon.png");
const searchIcon = require("../../assets/searchIcon.png");
const downloadIcon = require("../../assets/downloadIcon.png");
const settingIcon = require("../../assets/configIcon.png");
import DashboardIcon from "./icons/DashdoardIcon";
import SettingsIcon from "./icons/SettingsIcon";
import SearchIcon from "./icons/SearchIcon";
import DownloadIcon from "./icons/DownloadIcon";
const TabMenu = ({ nav }: { nav: boolean }) => {
  return (
    <View style={nav ? styles.tabManuNav : styles.tabManu}>
      <TouchableOpacity style={nav ? styles.buttonNav : styles.button}>
        <DashboardIcon color={"#7E7E7E"} />
        <Text style={nav ? styles.textNav : styles.text}>DashBoard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={nav ? styles.buttonNav : styles.button}>
        <SearchIcon color={"#7E7E7E"} />
        <Text style={nav ? styles.textNav : styles.text}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={nav ? styles.buttonNav : styles.button}>
        <DownloadIcon color={"#7E7E7E"} />
        <Text style={nav ? styles.textNav : styles.text}>Downloads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={nav ? styles.buttonNav : styles.button}>
        <SettingsIcon color={"#7E7E7E"} />
        <Text style={nav ? styles.textNav : styles.text}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabMenu;

const styles = StyleSheet.create({
  tabManu: {
    height: 16 * 4,
    backgroundColor: "rgba(37, 37, 37, 1)",
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
  },
  textNav: {
    height: 16,
    overflow: "hidden",
    color: "rgba(126, 126, 126, 1)",
    fontSize: 12,
  },
  tabManuNav: {
    height: 16 * 4,
    backgroundColor: "rgba(37, 37, 37, 1)",
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  buttonNav: {
    marginLeft: 16 * 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    color: "rgba(126, 126, 126, 1)",
    fontSize: 12,
  },
  button: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
