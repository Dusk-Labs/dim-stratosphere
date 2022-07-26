import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ArrowIcon from "./icons/ArrowIcon";
import Animated, { Easing, EasingNode, Value } from "react-native-reanimated";
type DropDownProps = {
  kind: string;
};

const DropDown = ({ kind }: DropDownProps) => {
  const [showContent, setShowContent] = useState(false);
  const transition = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    Animated.timing(transition, {
      duration: 200,
      toValue: showContent ? 0 : 1,
      easing: EasingNode.ease,
    }).start();
    setShowContent(!showContent);
  };
  const arrowTransform = transition.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const showBody = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          toggleListItem();
        }}
      >
        <View
          style={{
            ...styles.dropDownTitleContainer,
            borderRadius: showContent ? 0 : 10,
          }}
        >
          <Text style={styles.selected}>Any</Text>

          <Animated.View
            style={{
              ...styles.arrowButton,
              transform: [{ rotateZ: arrowTransform }],
            }}
          >
            <ArrowIcon color="white" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {showContent && (
        <Animated.View style={{ ...styles.body }}>
          <TouchableOpacity>
            <Text style={styles.option}>hello</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.option}>hello</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.option}>hello</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ ...styles.option, marginBottom: 0 }}>hello</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDownTitleContainer: {
    width: "100%",
    backgroundColor: "rgba(53, 52, 51, 1)",
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selected: {
    color: "white",
  },
  arrowButton: {
    height: 18,
    width: 18,
  },
  body: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(53, 52, 51, 1)",
    borderRadius: 0,
  },
  option: {
    color: "white",
    marginBottom: 8,
  },
});
