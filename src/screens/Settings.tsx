import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const Settings = () => {
  const { route, setRoute } = useAuthContext();
  useEffect(() => {
    setRoute("Settings");
  }, [route]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(14, 13, 11, 1)",
      }}
    >
      <Text style={{ color: "white" }}>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
