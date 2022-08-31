import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../router/stacks/AuthStackScreens";
import { Input } from "../../components/Input";
import { User, UserFormErrors } from "../../types";
import { useAuthContext } from "../../context/AuthContext";
import { PostSignIn } from "../../../api/Auth";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { HostHandler } from "../../components/utils/HostHandler";

type SignInProps = NativeStackScreenProps<AuthStackParams, "SignIn">;

type fetchProps = {
  // data = token
  data: any;
};

export const SignIn = ({ navigation, route }: SignInProps) => {
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

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

  const { signIn, setHost } = useAuthContext();

  const { refetch } = useQuery(
    ["signIn"] as QueryKey,
    async () => await PostSignIn({ user }),
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

  /*
   * regex for diferrent host options:
   * 1. http://127.1.1.1:8096
   * 2. http://127.1.1.1
   * 3. 127.1.1.1:8096
   * 4. 127.1.1.1
   * if not, invalid host
   */
  const hostRegex =
    /^(http:\/\/)?(https:\/\/)?([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)\.([a-zA-Z0-9]+)(:[0-9]+)?$/;

  // TODO (rodriM): Move hostRegex & validate method to another component

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
      handleError("Host is not valid", "host");
      valid = false;
    }

    if (valid) signInMethod();
  };

  const signInMethod = () => {
    console.log(user);
    refetch().then((res: fetchProps) => {
      console.log(JSON.stringify(res));
      // res.data && signIn({ userToken: res.data, host: HostHandler(user.host) });
      // fixing in next commit. Neec HostHandler(user.host) value to fetch...
      res.data && signIn({ userToken: res.data, host: user.host });
      setHost(user.host);
    });
  };

  const formatHostOnBlur = () => {
    if (!hostRegex.test(user.host)) {
      handleError("Host is not valid", "host");
    } else {
      // not good, to implement better in next commit
      const formatedHost = HostHandler(user.host);
      setUser({ ...user, host: formatedHost });
    }
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
            onBlur={() => formatHostOnBlur()}
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
                  Sign in
                </Text>
              </TouchableOpacity>
              <View style={styles.finalText}>
                <Text style={{ color: "#FFF", opacity: 0.5 }}>
                  Don&apos;t have an account yet?
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
