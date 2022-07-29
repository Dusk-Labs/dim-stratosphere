import { StyleSheet, View, ScrollView } from "react-native";
import { Carousel } from "../components/Carousel";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";

type DashboardProps = {
  navigation: any;
};

export const Dashboard = ({ navigation }: DashboardProps) => {
  const [nav, setNav] = useState(false);

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
        <AuthNavBar title={"Dashboard"} navigation={navigation} />
        <ScrollView style={styles.body}>
          <Carousel sectionTitle={"Continue Watching"} nav={nav} />
          <Carousel sectionTitle="Freshly Added" nav={nav} />
          <Carousel sectionTitle="Top Rated" nav={nav} />
        </ScrollView>
        {/* <TabMenu nav={nav} /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  HomePage: {
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(14, 13, 11, 1)",
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
    backgroundColor: "rgba(14, 13, 11, 1)",
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
