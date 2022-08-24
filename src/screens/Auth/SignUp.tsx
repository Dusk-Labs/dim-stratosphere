import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Input } from "../../components/Input";
import { User, UserFormErrors } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../router/stacks/AuthStackScreens";
import { PostSignUp } from "../../../api/Auth";
import { QueryKey, useQuery } from "@tanstack/react-query";

type SignInProps = NativeStackScreenProps<AuthStackParams, "SignIn">;

type postProps = {
  // data = username
  data: any;
};

export const SignUp = ({ navigation, route }: SignInProps) => {
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    host: "",
    // hardcoded for now. will be replaced with input?
    // inviteToken: "cc23092e-484c-4ef9-a40b-75e0829ebbea",
    // inviteToken: "c6e52889-0cec-4171-8980-a5d2ac872577",
    inviteToken: "28ec4b93-6136-4d4e-a081-1a9077dcfb39",
  });

  const [errors, setErrors] = useState<UserFormErrors>({
    username: "",
    password: "",
    host: "",
  });

  const { refetch } = useQuery(
    ["signUp"] as QueryKey,
    async () => await PostSignUp({ user }),
    {
      // query will not be executed when component is mounted
      enabled: false,
    }
  );

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOn(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOn(false);
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      Keyboard.removeAllListeners("keyboardDidShow");
    };
  }, []);

  // TODO Remove hostRegex & validate method

  // host regex with posible protocol and port
  // const hostRegex =
  // /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  // host regex with protocol and port
  const hostRegex =
    /^(?:(?:https?|http|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

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
    await refetch().then((res: postProps) => {
      if (res.data === user.username) {
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
          {!isKeyboardOn && (
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
          )}
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
