import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import Carousel from "../components/Carousel";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const context = React.useContext(AuthContext);
  const signOutFunc = async () => {
    context?.signOut();
  };

  return (
    <View style={styles.HomePage}>
      <Carousel sectionTitle="Continue Watching" />
      <Carousel sectionTitle="Freshly Added" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomePage: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingRight: "1%",
    paddingLeft: "1%",
  },
});
