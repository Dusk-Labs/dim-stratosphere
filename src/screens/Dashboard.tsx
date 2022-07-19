import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Carousel } from "../components/Carousel";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthNavBar } from "../components/AuthNavBar";
import { Nav } from "../components/Nav";
import { TabMenu } from "../components/TabMenu";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParams } from "../../App";

type DashboardProps = NativeStackScreenProps<MainStackParams, "Dashboard">;

const Dashboard = ({ navigation }: DashboardProps) => {
  const context = React.useContext(AuthContext);
  const [nav, setNav] = useState(false);

  const signOutFunc = async () => {
    context?.signOut();
  };

  return (
    <>
      <View style={nav ? styles.HomePageNav : styles.HomePage}>
        <TouchableOpacity onPress={() => signOutFunc()}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
        <AuthNavBar title={"Dashboard"} setNav={setNav} nav={nav} />
        <View style={styles.body}>
          <Carousel sectionTitle="Continue Watching" nav={nav} />
          <Carousel sectionTitle="Freshly Added" nav={nav} />
        </View>
        <TabMenu nav={nav} />
      </View>
      {nav && <Nav />}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  HomePage: {
    justifyContent: "space-evenly",
    alignContent: "center",
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
