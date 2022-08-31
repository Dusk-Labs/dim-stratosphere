import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import FilterSliderIcon from "../components/icons/FilterSliderIcon";
import { NavigationType } from "../types";

const navIcon = require("../../assets/navIcon.png");

type AuthNavBarProps = {
  title: string;
  navigation: NavigationType;
  moviesOrShows?: boolean;
};

export const AuthNavBar = ({
  title,
  navigation,
  moviesOrShows,
}: AuthNavBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.getParent().getParent().toggleDrawer();
        }}
      >
        <Image source={navIcon} style={styles.navIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {moviesOrShows && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <FilterSliderIcon color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16 * 2,
    padding: 8,
    position: "relative",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    height: 16 * 5,
    justifyContent: "center",
    flexDirection: "row",
  },
  navIcon: {
    height: 15,
    width: 20,
    marginBottom: 2,
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
  },
  button: {
    zIndex: 10,
    height: 30,
    width: 30,
    justifyContent: "center",
    position: "absolute",
    left: "0%",
    marginLeft: 8,
    marginRight: 8,
    alignItems: "center",
  },
  filterButton: {
    height: 30,
    position: "absolute",
    right: "0%",
    marginRight: 8,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
