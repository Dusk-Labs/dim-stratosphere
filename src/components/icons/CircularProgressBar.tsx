import React from "react";
import { View, StyleSheet } from "react-native";

type props={
    percent:number;
    size:number;
    backColor:string;
    progressColor:string;
}
const CircularProgressBar = ({ percent, size, backColor, progressColor }:props) => {
  function propStyle(percent, baseDegrees) {
    const rotateBy = baseDegrees + (percent * 3.6);
    return {
      transform: [{ rotateZ: `${rotateBy}deg` }]
    };
  }
  function renderThirdLayer(percent) {
    if (percent > 50) {
      /**
          * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
          * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
          * before passing to the propStyle function
          **/
      return <View style={[{ ...styles.secondProgressLayer }, propStyle((percent - 50), 45), { width: size, height: size, borderWidth: size / 5, borderRightColor: progressColor, borderTopColor: progressColor }]}></View>;
    } else {
      return <View style={{ ...styles.offsetLayer, width: size, height: size, borderWidth: size / 5, borderRightColor: backColor, borderTopColor: backColor }}></View>;
    }
  }
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={{ ...styles.container, width: size, height: size, borderWidth: size / 5, borderColor: backColor }}>
      <View style={[{ ...styles.firstProgressLayer }, firstProgressLayerStyle, { width: size, height: size, borderWidth: size / 5, borderRightColor: "rgba(234, 150, 62, 1)", borderTopColor: "rgba(234, 150, 62, 1)" }]}></View>
      {renderThirdLayer(percent)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /* width: 200,
    height: 200,
    borderWidth: 20, */
    borderRadius: 10,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },
  firstProgressLayer: {
    /* width: 200,
    height: 200,
    borderWidth: 20, */
    borderRadius: 10,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    transform: [{ rotateZ: "-135deg" }]
  },
  secondProgressLayer: {
    /*  width: 200,
    height: 200, */
    position: "absolute",
    // borderWidth: 20,
    borderRadius: 10,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    transform: [{ rotateZ: "45deg" }]
  },
  offsetLayer: {
    /* width: 200,
    height: 200, */
    position: "absolute",
    // borderWidth: 20,
    borderRadius: 10,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "-135deg" }]
  }
});

export default CircularProgressBar;
