import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { rem } from "../../constants/units";
import { NavigationType } from "../types";

type NavBarProps = {
  navigation: NavigationType;
  title: string;
};

export const Navbar = ({ navigation, title }: NavBarProps) => {
  return (
    <>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("LogIn", { title: "Log in" })}
        >
          <Image
            resizeMode="contain"
            source={require("./../../assets/arrowleft.png")}
          />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    padding: rem,
    borderRadius: 10,
    color: "#fff",
  },
  nav: {
    flexDirection: "row",
    marginTop: 2 * rem,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  backBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 2,
  },
  title: {
    color: "#fff",
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
});
