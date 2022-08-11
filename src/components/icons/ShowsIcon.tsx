import { StyleSheet, View } from "react-native";
import { IconInteface } from "../../types";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

const paths = ["M5.25 16.5H12.75", "M17.25 1.5H0.75V13.5H17.25V1.5Z"];

const showsIcon: FC<IconInteface> = ({ color }) => {
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

export default showsIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 18,
    width: 18,
  },
});
