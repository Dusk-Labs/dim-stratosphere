import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParams } from "../../../App";
import Input from "../../components/Input";
import { User, UserFormErrors } from "../../types";
import { useAuthContext } from "../../context/AuthContext";
import { PostSignIn } from "../../../api/auth/Auth";

type SignInProps = NativeStackScreenProps<StackParams, "SignIn">;

const SignIn = ({ navigation, route }: SignInProps) => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    host: "",
  });

  const [errors, setErrors] = useState<UserFormErrors>({
    username: "",
    password: "",
    host: "",
  });

  const { signIn } = useAuthContext();

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

    if (valid) signInMethod();
  };

  const signInMethod = async () => {
    const signInUrl = `http://${user.host}/api/v1/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    };

    const userToken = await PostSignIn({
      signInUrl: signInUrl,
      options: options,
    });

    userToken && signIn({ userToken: userToken });
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
            placeholder="Username"
            handleOnChangeText={(text) => handleOnChangeText(text, "username")}
            error={errors.username}
            onFocus={() => handleError("", "username")}
          />
          <Input
            placeholder="Password"
            showAndHidePassword={true}
            handleOnChangeText={(text) => handleOnChangeText(text, "password")}
            error={errors.password}
            onFocus={() => handleError("", "password")}
          />
          <Text style={{ marginBottom: 16, color: "#FFF", fontSize: 14 }}>
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
                Sign in
              </Text>
            </TouchableOpacity>
            <View style={styles.finalText}>
              <Text style={{ color: "#FFF", opacity: 0.5 }}>
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

export default SignIn;
