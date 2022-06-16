import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../App";

type SignInProps = NativeStackScreenProps<StackParams, "SignIn">;

const SignIn = ({ navigation, route }: SignInProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.SignInPage}>
      <View style={styles.top}>
        <Navbar navigation={navigation} title={route.params.title} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Username"
            style={styles.input}
          />
          <View style={styles.paswordAndEye}>
            <TextInput
              placeholderTextColor="gray"
              secureTextEntry={hidePassword}
              placeholder="Password"
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.eye}
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/eye.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ marginBottom: 16, color: "white", fontSize: 14 }}>
            Connect to host
          </Text>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Example 127.0.0.1"
            style={styles.input}
          />
          <Text style={{ color: "white", opacity: 0.5, fontSize: 14 }}>
            Enter host IP or address to connect
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigation.navigate("LogIn", { title: "Log In" })}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.finalText}>
            <Text style={{ color: "white", opacity: 0.5 }}>
              Don't have an account yet?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SignUp", { title: "Sign Up" })
              }
            >
              <Text style={{ color: "#EA963E" }}> Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

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
  paswordAndEye: {},
  eye: {
    position: "absolute",
    right: "5%",
    top: "20%",
  },
  finalText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  footer: {
    position: "relative",
    bottom: "-15%",
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
  input: {
    color: "white",
    backgroundColor: "#353433",
    padding: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  back: {
    padding: 16,
    borderRadius: 10,
    color: "#fff",
  },
  nav: {
    flexDirection: "row",
    marginTop: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
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

export default SignIn;
