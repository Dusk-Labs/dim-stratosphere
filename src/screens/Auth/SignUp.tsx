import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { User, UserFormErrors } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../../App";
import { PostSignUp } from "../../../api/auth/Auth";

type SignInProps = NativeStackScreenProps<AuthStackParams, "SignIn">;

export const SignUp = ({ navigation, route }: SignInProps) => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    host: "",
    // hardcoded for now. will be replaced with input?
    inviteToken: "cc23092e-484c-4ef9-a40b-75e0829ebbea",
  });

  const [errors, setErrors] = useState<UserFormErrors>({
    username: "",
    password: "",
    host: "",
  });

  const hostRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!user.username) {
      handleError("Username is required", "username");
      valid = false;
    } else if (user.username.length < 3) {
      handleError("Username must be at least 3 characters", "username");
      valid = false;
    } else if (user.username.length > 20) {
      handleError("Username must be less than 20 characters", "username");
      valid = false;
    }

    if (!user.password) {
      handleError("Password is required", "password");
      valid = false;
    } else if (user.password.length < 6) {
      handleError("Password must be at least 6 characters", "password");
      valid = false;
    }

    if (!user.host) {
      handleError("Host is required", "host");
      valid = false;
    } else if (!hostRegex.test(user.host)) {
      handleError("Host must be a valid IP address", "host");
      valid = false;
    }

    if (valid) signUpMethod();
  };

  const signUpMethod = async () => {
    const signUpUrl = `http://${user.host}/api/v1/auth/register`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        invite_token: user.inviteToken,
      }),
    };

    await PostSignUp({
      signUpUrl: signUpUrl,
      options: options,
    }).then((res) => {
      console.log(res);
      if (res === user.username) {
        alert("Successfully registered");
        // TODO login automatically when registered successfully
      }
    });
  };

  const handleOnChangeText = (text: string, input: string) => {
    setUser({ ...user, [input]: text });
  };

  const handleError = (error: string, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <View style={styles.SignInPage}>
      <View style={styles.top}>
        <Navbar navigation={navigation} title={route.params.title} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.form}>
          <Input
            placeholder="Choose a Username"
            handleOnChangeText={(text) => handleOnChangeText(text, "username")}
            error={errors.username}
            onFocus={() => handleError("", "username")}
          />
          <Input
            placeholder="Create a Password"
            showAndHidePassword={true}
            handleOnChangeText={(text) => {
              handleOnChangeText(text, "password");
            }}
            error={errors.password}
            onFocus={() => handleError("", "password")}
          />
          <Text style={{ marginBottom: 8, color: "#FFF", fontSize: 14 }}>
            Connect to host
          </Text>
          <Input
            placeholder="Example 127.0.0.1"
            handleOnChangeText={(text) => handleOnChangeText(text, "host")}
            error={errors.host}
            onFocus={() => handleError("", "host")}
          />
          {errors.host === "" && (
            <Text style={{ color: "#FFF", opacity: 0.5, fontSize: 14 }}>
              Enter host IP or address to connect
            </Text>
          )}
        </View>
        <View style={styles.bottomFromBottom}>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => validate()}
            >
              <Text style={{ color: "#FFF", textAlign: "center" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                opacity: 0.5,
                fontSize: 10,
                marginBottom: 18,
                textAlign: "center",
              }}
            >
              By signing up you are agreeing to our Terms of Service
            </Text>
            <View style={styles.finalText}>
              <Text style={{ color: "#FFF", opacity: 0.5 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  SignInPage: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(14, 13, 11, 1)",
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
    marginBottom: 6,
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
