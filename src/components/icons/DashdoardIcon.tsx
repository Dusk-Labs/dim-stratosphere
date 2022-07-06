import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
const paths = [
  "M19.6667 1.5H1.33333V6.5H19.6667V1.5Z",
  "M1.3334 11.5H19.6667",
  "M1.3334 16.5H19.6667",
];
const DashdoardIcon = ({ color }: { color: string }) => {
  return (
    <View style={styles.layer}>
      <Svg width="21" height="18" fill="none" viewBox="0 0 21 18">
        {paths.map((d, key) => (
          <Path
            d={d}
            key={key}
            stroke={color}
            strokeWidth={1.2}
            stroke-miterlimit="10"
            stroke-linecap="square"
          />
        ))}
      </Svg>
    </View>
  );
};

export default DashdoardIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 5,
    width: 21,
  },
});
