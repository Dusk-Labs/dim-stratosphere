import { StyleSheet, View } from "react-native";
import { IconInteface } from "../../types";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

const paths = [
  "M5.99988 8.00269H16.4999",
  "M13.9999 10.5027L16.4999 8.00269L13.9999 5.50269",
  "M11.4999 11V14C11.5113 14.253 11.4221 14.5003 11.2517 14.6877C11.0812 14.8751 10.8436 14.9874 10.5906 15H2.40857C2.15571 14.9872 1.91819 14.8749 1.74792 14.6875C1.57765 14.5001 1.48848 14.2529 1.49991 14V2C1.48831 1.74703 1.57741 1.49976 1.74772 1.31234C1.91802 1.12492 2.15565 1.01261 2.40857 1H10.5906C10.8436 1.01261 11.0812 1.1249 11.2517 1.3123C11.4221 1.4997 11.5113 1.74696 11.4999 2V5",
];

const logOutIcon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="22" height="22" viewBox="0 0 18 16" fill="none">
        {paths.map((d, key) => (
          <Path
            d={d}
            key={key}
            stroke={color}
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
};

export default logOutIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
  },
});
