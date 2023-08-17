import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../router/stacks/AuthStackScreens";
import { rem } from "../../../constants/units";
import DimIcon from "../../components/icons/DimIcon";

type LoginProps = NativeStackScreenProps<AuthStackParams, "LogIn">;

export const LogIn = ({ navigation }: LoginProps) => {
  return (
    <View style={styles.login}>
      <View style={styles.top}>
        <View
          style={{
            height: 100,
            width: 100,
            marginBottom: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DimIcon color="white" />
        </View>
        <Text style={styles.title}>Dim</Text>
        <Text style={styles.subtitle}>Self-hosted media manager</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn", { title: "Sign In" })}
          >
            <Text style={styles.buttonTop}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp", { title: "Sign Up" })}
          >
            <Text style={styles.buttonBottom}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 24,
  },
  title: {
    color: "#fff",
    marginBottom: 8,
    fontWeight: "bold",
  },
  login: {
    color: "#fff",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(14, 13, 11, 1)",
  },
  subtitle: {
    color: "#fff",
    opacity: 0.5,
  },
  bottom: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    flex: 1,
    padding: rem,
    width: "100%",
  },
  buttons: {
    color: "#fff",
    alignSelf: "center",
    flexDirection: "column",
    width: "100%",
  },
  buttonTop: {
    color: "#fff",
    backgroundColor: "#353433",
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    textAlign: "center",
  },
  buttonBottom: {
    color: "#fff",
    backgroundColor: "#EA963E",
    padding: 8,
    borderRadius: 10,
    textAlign: "center",
  },
});
