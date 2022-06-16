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

const SignUp = ({ navigation, route }: any) => {
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
            placeholder="Choose a Username"
            style={styles.input}
          />
          <View>
            <TextInput
              placeholderTextColor="gray"
              secureTextEntry={hidePassword}
              placeholder="Create a Password"
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
            onPress={() => alert("Signed Up!")}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              opacity: 0.5,
              fontSize: 10,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            By signing up you are agreeing to our Terms of Service
          </Text>
          <View style={styles.finalText}>
            <Text style={{ color: "white", opacity: 0.5 }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SignIn", { title: "Sign In" })
              }
            >
              <Text style={{ color: "#EA963E" }}> Sign in</Text>
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
    bottom: "-8%",
  },
  signInBtn: {
    backgroundColor: "#EA963E",
    borderRadius: 10,
    width: "100%",
    padding: 8,
    marginBottom: 8,
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
export default SignUp;
