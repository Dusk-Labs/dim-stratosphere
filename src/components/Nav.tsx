import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
const userImage = require("../../assets/logo.png");
const Nav = () => {
  const timeWatched = 2;
  const userName = "Rodrigo";
  return (
    <View style={styles.nav}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.imageConteiner}>
            <Image
              source={userImage}
              style={styles.userImage}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={styles.useInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.timeWatched}>Watched {timeWatched}h</Text>
          </View>
        </View>
        <View style={styles.rigth}></View>
      </View>
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
  imageConteiner: {
    borderColor: "white",
    borderRadius: 50,
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  header: {
    width: "100%",
    marginTop: 16 * 2,
    height: "10%",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 16,
  },
  rigth: {},
  userImage: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  useInfo: {
    flexDirection: "column",
  },
  userName: {
    color: "white",
    fontWeight: "600",
  },
  timeWatched: {
    color: "gray",
  },
});
