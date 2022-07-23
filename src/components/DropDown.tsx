import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import Animated, { Value } from "react-native-reanimated";
type DropDownProps = {
  kind: string;
};

const DropDown = ({ kind }: DropDownProps) => {
  const transition = useRef(new Animated.Value(0)).current;
  return (
    <Animated.View style={styles.dropDown}>
      <Text style={styles.selected}>Any</Text>
      <TouchableOpacity style={styles.arrowButton}>
        <ArrowIcon color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDown: {
    width: "100%",
    backgroundColor: "rgba(53, 52, 51, 1)",
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selected: {
    color: "white",
  },
  arrowButton: {
    height: 18,
    width: 18,
  },
});
