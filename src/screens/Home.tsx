import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const context = React.useContext(AuthContext);

  //rename better
  const signOutFunc = async () => {
    context?.signOut();
  };
  return (
    <View style={styles.SignInPage}>
      <View style={styles.top}>
        <Text style={{ color: "white" }}>Home</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomFromBottom}>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => signOutFunc()}
            >
              <Text style={{ color: "#FFF", textAlign: "center" }}>
                Sign OUT
              </Text>
            </TouchableOpacity>
            <View style={styles.finalText}>
              <Text style={{ color: "#FFF", opacity: 0.5 }}>
                Don't have an account yet?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  SignInPage: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingRight: "1%",
    paddingLeft: "1%",
  },
  bottomFromBottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  finalText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  footer: {
    position: "relative",
    marginBottom: 16,
  },
  signInBtn: {
    backgroundColor: "#EA963E",
    borderRadius: 10,
    width: "100%",
    padding: 8,
    marginBottom: 16,
  },
  form: {
    width: "100%",
    justifyContent: "center",
  },
  top: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  bottom: {
    flex: 1,
    width: "100%",
  },
});
