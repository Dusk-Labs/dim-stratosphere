import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDown from "./DropDown";

const RigthDrawer = () => {
  return (
    <View style={styles.rigthDrawer}>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Sort By</Text>
        <DropDown />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Order</Text>
        <DropDown />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Genre</Text>
        <DropDown />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Language</Text>
        <DropDown />
      </View>
    </View>
  );
};

export default RigthDrawer;

const styles = StyleSheet.create({
  rigthDrawer: {
    flex: 1,
    backgroundColor: "rgba(37, 37, 37, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterSection: {},
  filtersTitle: {
    color: "white",
  },
});
