import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const Search = () => {
  const { route, setRoute } = useAuthContext();
  useEffect(() => {
    setRoute("Search");
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
      <Text style={{ color: "white" }}>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
