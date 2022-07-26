import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import SettingsIcon from "./icons/SettingsIcon";
import MoviesICon from "./icons/MoviesIcon";
import ShowsIcon from "./icons/ShowsIcon";
import LogOutIcon from "./icons/LogOutIcon";

const userImage = require("../../assets/logo.png");
// const logOutIcon = require("../../assets/logOutIcon.png");
const moviesIcon = require("../../assets/moviesIcon.png");
// const showsIcon = require("../../assets/showsIcon.png");

type NavProps = {
  navigation: any;
};

export const Nav = ({ ...props }: NavProps) => {
  const timeWatched = 2;
  const userName = "Rodrigo";

  return (
    <>
      <View style={styles.nav}>
        <View style={styles.header}>
          <View style={styles.left}>
            <View style={styles.imageContainer}>
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
          <View style={styles.rigth}>
            <TouchableOpacity
              style={styles.configBtn}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            >
              <SettingsIcon color={"#7E7E7E"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logOutBtn}>
              <LogOutIcon color={"#7E7E7E"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.libraries}>LIBRARIES</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Movies");
            }}
          >
            <View style={styles.section}>
              <View style={styles.iconAndText}>
                <View>
                  <MoviesICon color="#7E7E7E" />
                </View>
                <Text style={styles.sectionTitle}>Movies</Text>
              </View>
              <Text style={styles.itemsNumber}>132</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Shows");
            }}
          >
            <View style={{ ...styles.section, marginTop: 16 * 1.5 }}>
              <View style={styles.iconAndText}>
                <View>
                  <ShowsIcon color={"#7E7E7E"} />
                </View>
                <Text style={styles.sectionTitle}>Shows</Text>
              </View>
              <Text style={styles.itemsNumber}>80</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemsNumber: {
    backgroundColor: "rgba(234, 150, 62, 0.5)",
    borderRadius: 30,
    paddingTop: 2,
    paddingHorizontal: 8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "white",
    fontSize: 12,
  },
  sectionTitle: {
    fontWeight: "400",
    marginLeft: 16,
    fontSize: 14,
    color: "white",
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  body: {
    padding: 16,
    paddingTop: 16 * 2,
  },
  libraries: {
    color: "#EA963E",
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 16 * 2,
  },
  logOutIcon: {
    height: 20,
    width: 20,
  },
  nav: {
    flex: 1,
    backgroundColor: "#252525",
  },
  imageContainer: {
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
    height: 16 * 5,
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
  rigth: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
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
    fontSize: 12,
  },
  timeWatched: {
    color: "gray",
    fontSize: 12,
  },
  configBtn: {
    marginRight: 16,
  },
  logOutBtn: {
    marginRight: 16,
  },
});
