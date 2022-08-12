import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import ArrowIcon from "./icons/ArrowIcon";
import Animated, { EasingNode } from "react-native-reanimated";

type DropDownProps = {
  kind: string;
  options: Array<string>;
  setOption: Dispatch<SetStateAction<number>>;
  first?: boolean;
  setFirst?: Dispatch<SetStateAction<boolean>>;
  season?: Array<any>;
};

const DropDown = ({
  kind,
  options,
  setOption,
  first,
  setFirst,
  season,
}: DropDownProps) => {
  const [showContent, setShowContent] = useState(false);
  const [selected, setSelected] = useState("Any");
  const transition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (first) {
      if (kind === "Season") {
        setSelected(season[0].season_number);
      } else {
        setSelected("Any");
      }
      setFirst(false);
    }
  }, [first]);

  const toggleListItem = () => {
    Animated.timing(transition, {
      duration: 200,
      toValue: showContent ? 0 : 1,
      easing: EasingNode.ease,
    }).start();
    setShowContent(!showContent);
  };

  // ToDo fix type
  const arrowTransform = transition.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  }) as any;

  const showBody = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  function handlePress(element) {
    setOption(element);
    setSelected(element);
    toggleListItem()
  }
  function HandleAddZero(number: number | string) {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          toggleListItem();
        }}
      >
        <View
          style={
            showContent
              ? styles.dropDownTitleContainerOpened
              : styles.dropDownTitleContainer
          }
        >
          <Text style={styles.selected}>
            {kind === "Season" ? "Season " + HandleAddZero(selected) : selected}
          </Text>

          <Animated.View
            style={{
              transform: [{ rotateZ: arrowTransform }],
              ...styles.arrowButton,
            }}
          >
            <ArrowIcon color="white" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <View style={showContent ? styles.body : styles.bodyOff}>
        {showContent &&
          options.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handlePress(element);
                }}
              >
                <Text style={styles.option}>
                  {kind === "Season"
                    ? "Season " + HandleAddZero(element)
                    : element}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      {/* {showContent && (
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
      )} */}
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
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "rgba(53, 52, 51, 1)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bodyOff: {
    flex: 0,
  },
  option: {
    color: "white",
    marginBottom: 8,
  },
  dropDownTitleContainerOpened: {
    width: "100%",
    backgroundColor: "rgba(53, 52, 51, 1)",
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
