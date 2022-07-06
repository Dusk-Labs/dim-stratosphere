import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AuthNavBar from "../components/AuthNavBar";
import Nav from "../components/Nav";
import TabMenu from "../components/TabMenu";
const Home = () => {
  const authContext = useAuthContext();
  const [nav, setNav] = useState(false);
  const signOutFunc = async () => {
    authContext.signOut();
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
        <TabMenu />
      </View>
      {nav && <Nav />}
    </>
  );
};

export default Home;

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
    paddingLeft: "2%",
  },
  signOut: {
    color: "white",
    fontSize: 20,
    marginTop: "10%",
    marginBottom: "10%",
  },
});
