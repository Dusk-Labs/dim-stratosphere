import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { FC, Dispatch, SetStateAction } from "react";

const navIcon = require("../../assets/navIcon.png");

interface AuthNavBarProps {
  title: string;
  setNav: Dispatch<SetStateAction<boolean>>;
  nav: boolean;
}

const AuthNavBar: FC<AuthNavBarProps> = ({ title, setNav, nav }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setNav(!nav);
        }}
      >
        <Image source={navIcon} style={styles.navIcon} />
      </TouchableOpacity>
      <Text style={nav ? { marginLeft: 16 * 4 } : styles.title}>{title}</Text>
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
});
