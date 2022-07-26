import { StyleSheet, View } from "react-native";
import { IconInteface } from "../../types";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

const paths = [
  "M1.5 1.5V16.5",
  "M1.5 9H4.5",
  "M13.5 9H16.5",
  "M4.5 9H13.5",
  "M1.5 6H4.5",
  "M1.5 3H4.5",
  "M13.5 6H16.5",
  "M13.5 3H16.5",
  "M13.5 15H16.5",
  "M13.5 12H16.5",
  "M1.5 15H4.5",
  "M1.5 12H4.5",
  "M16.5 1.5V16.5",
  "M13.5 1.5H4.5V16.5H13.5V1.5Z",
];

const MoviesICon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {paths.map((d, key) => (
          <Path
            d={d}
            key={key}
            stroke={color}
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="square"
          />
        ))}
      </Svg>
    </View>
  );
};

export default MoviesICon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 18,
    width: 18,
  },
});
