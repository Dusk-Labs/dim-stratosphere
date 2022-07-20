import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { FC, Dispatch, SetStateAction } from "react";
import FilterSliderIcon from "../components/icons/FilterSliderIcon";

const navIcon = require("../../assets/navIcon.png");

interface AuthNavBarProps {
  title: string;
  navigation: any;
  moviesOrShows?: boolean;
}

const AuthNavBar: FC<AuthNavBarProps> = ({
  title,
  navigation,
  moviesOrShows,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.getParent().toggleDrawer();
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
export default AuthNavBar;
const styles = StyleSheet.create({
  container: {
    marginTop: 16 * 2,
    padding: 8,
    position: "relative",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    height: "10%",
    justifyContent: "center",
    flexDirection: "row",
  },
  navIcon: {
    height: 15,
    width: 20,
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  button: {
    zIndex: 10,
    height: "100%",
    width: "20%",
    justifyContent: "center",
    position: "absolute",
    left: "0%",
    marginLeft: 8,
    marginRight: 8,
  },
  filterButton: {
    height: 18,
    position: "absolute",
    right: "0%",
    marginRight: 8,
  },
});
