import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import AuthNavBar from "../components/AuthNavBar";
import Nav from "../components/Nav";
import TabMenu from "../components/TabMenu";

interface DashboardProps {
  navigation: any;
}

const Dashboard = ({ navigation }: DashboardProps) => {
  const context = React.useContext(AuthContext);
  const [nav, setNav] = useState(false);

  const signOutFunc = async () => {
    context?.signOut();
  };
  useEffect(() => {
    if (nav) {
      navigation.openDrawer();
    } else {
      navigation.closeDrawer();
    }
  }, [nav]);
  return (
    <>
      <View style={styles.HomePage}>
        <AuthNavBar
          title={"Dashboard"}
          setNav={setNav}
          nav={nav}
          navigation={navigation}
        />
        <View style={styles.body}>
          <Carousel sectionTitle="Continue Watching" nav={nav} />
          <Carousel sectionTitle="Freshly Added" nav={nav} />
        </View>
        {/* <TabMenu nav={nav} /> */}
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  HomePage: {
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  body: {
    flex: 1,
    paddingRight: "1%",
    paddingLeft: "1%",
  },
  HomePageNav: {
    marginLeft: "80%",
    justifyContent: "space-evenly",
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingRight: "0%",
    paddingLeft: 8,
  },
  signOut: {
    color: "white",
    fontSize: 20,
    marginTop: "10%",
    marginBottom: "10%",
  },
});
