import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";

interface InputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  setHidePassword?: (hidePassword: boolean) => void;
  hidePassword?: boolean;
  showAndHidePassword?: boolean;
  handleOnChangeText?: (text: string) => void;
  error?: string;
  onFocus?: () => void;
}

const Input = ({
  placeholder,
  setHidePassword,
  secureTextEntry,
  hidePassword,
  showAndHidePassword,
  handleOnChangeText,
  error,
  onFocus,
  ...props
}: InputProps) => {
  return (
    <>
      <View>
        <TextInput
          placeholderTextColor="gray"
          placeholder={placeholder}
          style={[
            styles.input,
            { borderWidth: 1, borderColor: error ? "red" : "transparent" },
          ]}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) =>
            handleOnChangeText && handleOnChangeText(text)
          }
          onFocus={onFocus}
          {...props}
        />
        {showAndHidePassword && (
          <TouchableOpacity
            style={styles.eye}
            onPress={() => {
              setHidePassword?.(!hidePassword);
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../assets/eye.png")}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.error}>{error}</Text>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    color: "white",
    backgroundColor: "#353433",
    padding: 8,
    marginBottom: 5,
    borderRadius: 10,
  },
  eye: {
    position: "absolute",
    right: "5%",
    top: "20%",
  },
  error: {
    color: "red",
    marginBottom: 4,
  },
});
