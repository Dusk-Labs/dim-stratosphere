import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AuthNavBar from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";

const Shows = ({ navigation }: any) => {
  const { route, setRoute } = useAuthContext();
  useEffect(() => {
    setRoute("Shows");
  }, [route]);
  return (
    <View style={styles.moviesPage}>
      <AuthNavBar
        title={"Shows"}
        navigation={navigation}
        moviesOrShows={true}
      />
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Shows</Text>
      </View>
    </View>
  );
};

export default Shows;

const styles = StyleSheet.create({
  moviesPage: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(14, 13, 11, 1)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
