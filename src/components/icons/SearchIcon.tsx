import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { IconInteface } from "../../types";
import Svg, { Path } from "react-native-svg";

const paths = [
  "M11.7397 14.8616C12.6051 14.4938 13.3897 13.9591 14.0485 13.2881C14.7073 12.6171 15.2275 11.8228 15.5794 10.9508C15.9312 10.0787 16.1079 9.14587 16.0993 8.20552C16.0907 7.26518 15.8969 6.33574 15.5291 5.47028C15.1612 4.60482 14.6265 3.82029 13.9555 3.16147C13.2845 2.50265 12.4903 1.98245 11.6182 1.63057C10.7461 1.27869 9.8133 1.10202 8.87295 1.11065C7.93261 1.11929 7.00317 1.31305 6.13771 1.68088C4.38984 2.42374 3.00865 3.83052 2.298 5.59174C1.58735 7.35296 1.60544 9.32435 2.34831 11.0722C3.09117 12.8201 4.49795 14.2013 6.25917 14.9119C8.02039 15.6226 9.99178 15.6045 11.7397 14.8616Z",
  "M14.0017 13.3345L19.5554 18.889",
];

const SearchIcon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

export default SearchIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 5,
    width: 21,
  },
});
