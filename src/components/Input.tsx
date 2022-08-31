import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  showAndHidePassword?: boolean;
  handleOnChangeText?: (text: string) => void;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Input = ({
  placeholder,
  showAndHidePassword,
  handleOnChangeText,
  error,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(
    showAndHidePassword || false
  );

  return (
    <>
      <View>
        <TextInput
          placeholderTextColor="gray"
          placeholder={placeholder}
          style={[
            styles.input,
            { borderWidth: 1, borderColor: error ? "#FF4D4D" : "transparent" },
          ]}
          secureTextEntry={hidePassword}
          onChangeText={
            (text) => handleOnChangeText && handleOnChangeText(text) // ?
          }
          onFocus={onFocus}
          onBlur={onBlur}
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
      {error !== "" && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    color: "#FFF",
    backgroundColor: "#353433",
    padding: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  eye: {
    position: "absolute",
    right: "5%",
    top: "20%",
  },
  error: {
    color: "#FF4D4D",
    marginTop: -8,
    marginBottom: 8,
    fontSize: 12,
  },
});
