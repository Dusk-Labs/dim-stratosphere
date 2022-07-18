import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const dashboardIcon = require("../../assets/dashBoardIcon.png");
const searchIcon = require("../../assets/searchIcon.png");
const downloadIcon = require("../../assets/downloadIcon.png");
const settingIcon = require("../../assets/configIcon.png");

const TabMenu = () => {
  return (
    <View style={styles.tabManu}>
      <TouchableOpacity style={styles.button}>
        <Image source={dashboardIcon} />
        <Text style={styles.text}>DashBoard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={searchIcon} />
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={downloadIcon} />
        <Text style={styles.text}>Downloads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={settingIcon} />
        <Text style={styles.text}>Settings</Text>
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
  },
  text: {
    color: "rgba(126, 126, 126, 1)",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
