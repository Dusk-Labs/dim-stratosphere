import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Nav = () => {
  return (
    <View style={styles.nav}>
      <Text>Nav</Text>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  nav: {
    width: "80%",
    position: "absolute",
    flex: 1,
    backgroundColor: "#252525",
    height: "100%",
    zIndex: 9,
  },
});
