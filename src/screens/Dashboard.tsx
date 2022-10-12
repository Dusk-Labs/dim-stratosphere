import { StyleSheet, View, ScrollView,Dimensions } from "react-native";
import { Carousel } from "../components/Carousel";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../api/GetDashboardData";
import { useAuthContext } from "../context/AuthContext";
import { NavigationType } from "../types";
import  BannerCard  from "../components/BannerCard";

type DashboardProps = {
  navigation: NavigationType;
};

export const Dashboard = ({ navigation }: DashboardProps) => {
  const [nav] = useState(false);
  const [banner,setBanner]=useState()
  const { host, userToken } = useAuthContext();
  const { data } = useQuery(
    ["getDashboardData"] as QueryKey,
    () => getDashboardData({ host, userToken }),
    {
      enabled: userToken !== null && host !== "",
    }
  );
  useEffect(() => {
    const config = {
      headers: {
        Authorization: userToken,
      },
    } as any;
fetch(`${host}/api/v1/dashboard/banner`,config).then((res)=>res.json()).then((res)=>{setBanner(res);console.log(res[0])})
  }, [data]);

  const sectionTitles = Object.keys(data || {});

  useEffect(() => {
    nav ? navigation.openDrawer() : navigation.closeDrawer();
  }, [nav]);

  return (
    <>
      <View style={styles.HomePage}>
        {banner && <BannerCard backDrop={banner[0].backdrop} title={banner[0].title} year={banner[0].year} genres={banner[0].genres}/>}
         <AuthNavBar title={"Dashboard"} navigation={navigation} />
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
