import { StyleSheet, View } from "react-native";
import { IconInteface } from "../../types";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

const paths = [
  "M7.20834 11.875L10.3333 15L13.4583 11.875",
  "M10.3333 5.625V15",
  "M10.3333 19.375C15.511 19.375 19.7083 15.1777 19.7083 10C19.7083 4.82233 15.511 0.625 10.3333 0.625C5.15567 0.625 0.958344 4.82233 0.958344 10C0.958344 15.1777 5.15567 19.375 10.3333 19.375Z",
];

const DownloadIcon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
        {paths.map((d, key) => (
          <Path
            d={d}
            key={key}
            stroke={color}
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
};

export default DownloadIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 5,
    width: 21,
  },
});
