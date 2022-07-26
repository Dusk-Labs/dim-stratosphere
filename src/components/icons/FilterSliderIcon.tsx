import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { IconInteface } from "../../types";
import Svg, { Path } from "react-native-svg";

const paths = [
  "M11.001 14H19.001",
  "M1.00101 14H5.00101",
  "M11.001 14C11.001 14.5933 10.8251 15.1733 10.4955 15.6666C10.1659 16.1599 9.69747 16.5444 9.14937 16.7715C8.60126 16.9986 7.99813 17.0581 7.41623 16.9425C6.83432 16.8268 6.29977 16.5412 5.88016 16.1218C5.46055 15.7024 5.17472 15.1679 5.05882 14.5861C4.94291 14.0042 5.00213 13.4011 5.22899 12.8529C5.45584 12.3047 5.84016 11.836 6.33333 11.5062C6.8265 11.1764 7.40639 11.0003 7.99967 11C8.39375 10.9998 8.784 11.0773 9.14813 11.228C9.51226 11.3787 9.84314 11.5996 10.1219 11.8782C10.4006 12.1568 10.6217 12.4876 10.7725 12.8516C10.9234 13.2157 11.001 13.6059 11.001 14V14Z",
  "M13.001 4H1.00101",
  "M19.001 4C19.001 3.40671 18.8251 2.82675 18.4955 2.33343C18.1659 1.84011 17.6975 1.45559 17.1494 1.22849C16.6013 1.00139 15.9981 0.941901 15.4162 1.05755C14.8343 1.1732 14.2998 1.45879 13.8802 1.87821C13.4605 2.29763 13.1747 2.83206 13.0588 3.41391C12.9429 3.99577 13.0021 4.59893 13.229 5.14713C13.4558 5.69533 13.8402 6.16396 14.3333 6.49376C14.8265 6.82356 15.4064 6.99974 15.9997 7C16.7954 7 17.5586 6.68397 18.1215 6.1214C18.6843 5.55883 19.0007 4.79577 19.001 4V4Z",
];

const FilterSliderIcon: FC<IconInteface> = ({ color }) => {
  return (
    <View style={styles.layer}>
      <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
        {paths.map((d, key) => (
          <Path
            d={d}
            key={key}
            stroke={color}
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        ))}
      </Svg>
    </View>
  );
};

export default FilterSliderIcon;

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 5,
    width: 21,
  },
});
