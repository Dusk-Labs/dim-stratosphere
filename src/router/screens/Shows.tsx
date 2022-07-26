import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthNavBar } from "../../components/AuthNavBar";

export const Shows = ({ navigation }: any) => {
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
