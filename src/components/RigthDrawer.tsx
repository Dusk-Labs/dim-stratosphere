import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropDown from "./DropDown";

export const RigthDrawer = () => {
  return (
    <View style={styles.rigthDrawer}>
      <View style={{ ...styles.filterSection, marginTop: 16 * 2.5 }}>
        <Text style={styles.filtersTitle}>Sort By</Text>
        <DropDown kind="Sort By" />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Order</Text>
        <DropDown kind="Order" />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Genre</Text>
        <DropDown kind="Genre" />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filtersTitle}>Language</Text>
        <DropDown kind="Language" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rigthDrawer: {
    flex: 1,
    backgroundColor: "rgba(37, 37, 37, 1)",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
  },
  filterSection: { width: "100%" },
  filtersTitle: {
    color: "white",
    fontSize: 12,
    marginBottom: 16,
    marginTop: 16,
  },
});
