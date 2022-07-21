import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const Downloads = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(14, 13, 11, 1)",
      }}
    >
      <Text style={{ color: "white" }}>Downloads</Text>
    </View>
  );
};

export default Downloads;

const styles = StyleSheet.create({});
