import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Carousel } from "../components/Carousel";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../api/GetDashboardData";
import { useAuthContext } from "../context/AuthContext";
import { NavigationType } from "../types";
import Banner from "../components/Banner";
import CircularProgressBar from "../components/icons/CircularProgressBar";

type DashboardProps = {
  navigation: NavigationType;
};

export const Dashboard = ({ navigation }: DashboardProps) => {
  const [nav] = useState(false);
  const { host, userToken } = useAuthContext();
  const { data } = useQuery(
    ["getDashboardData"] as QueryKey,
    () => getDashboardData({ host, userToken }),
    {
      enabled: userToken !== null && host !== "",
    }
  );

  const sectionTitles = Object.keys(data || {});

  useEffect(() => {
    nav ? navigation.openDrawer() : navigation.closeDrawer();
  }, [nav]);

  return (
    <>
      <View style={styles.HomePage}>
        <Banner />
        <AuthNavBar
          title={"Dashboard"}
          navigation={navigation}
          position={"absolute"}
        />
        <ScrollView style={styles.body}>
          {sectionTitles.map((sectionTitle: string) => (
            <Carousel
              key={sectionTitle}
              sectionTitle={sectionTitle}
              navigation={navigation}
            />
          ))}
        </ScrollView>
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
