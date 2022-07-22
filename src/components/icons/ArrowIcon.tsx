import { StyleSheet, View } from "react-native";
import { IconInteface } from "../../types";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

const paths = [
  "M17 1.32094L9.37689 8.94334C9.32742 8.99288 9.26867 9.03218 9.204 9.05899C9.13933 9.08581 9.07001 9.09961 9 9.09961C8.92999 9.09961 8.86067 9.08581 8.796 9.05899C8.73133 9.03218 8.67258 8.99288 8.62311 8.94334L1 1.32094",
];

const DashdoardIcon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        {paths.map((d, key) => (
          <Path
            d={d}
            key={key}
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
    height: 10,
    width: 18,
  },
});
