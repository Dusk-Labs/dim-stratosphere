import { StyleSheet, View } from "react-native";
import { IconInteface } from "../../types";
import React, { FC, useEffect } from "react";
import Svg, { Circle, Rect } from "react-native-svg";

const paths = ["7", "14.7778", "22.5556"];

const ReadMoreIcon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="30" height="14" viewBox="0 0 30 14" fill="none">
        <Rect
          width="29.5556"
          height="14"
          rx="3.11111"
          fill={color}
          fill-opacity="0.34"
        />
        <Circle cx="7" cy="7.00033" r="2.33333" fill="white" />
        <Circle cx="14.7778" cy="7.00033" r="2.33333" fill="white" />
        <Circle cx="22.5556" cy="7.00033" r="2.33333" fill="white" />
      </Svg>
    </View>
  );
};

export default ReadMoreIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
  },
});
