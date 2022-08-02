import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { MovieContainer } from "./MovieContainer";
import { movies } from "../movies";
import { useAuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const logo = require("../../assets/logo.png");

type CarouselProps = {
  sectionTitle?: string;
  navigation:any
};

export const Carousel = ({ sectionTitle,navigation }: CarouselProps) => {
  const { host, userToken } = useAuthContext();
  const [dashboardData, setDashboardData] = useState();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: JSON.parse(userToken as string),
      },
    } as any;
    fetch(`http://${host}:8000/api/v1/dashboard`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const title = sectionTitle.toUpperCase();
        setDashboardData(data[title]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(userToken);
  }, [host]);
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>
      <ScrollView style={styles.moviesSection} horizontal={true}>
        {dashboardData &&
          dashboardData.map((element) => {
            return (
              <TouchableOpacity
                key={element.id}
                onPress={() => {
                  navigation.navigate("MediaPage",{name:element.name,id:element.id})
                }}
              >
                <MovieContainer
                  key={element.id}
                  title={element.name}
                  picture={element.poster_path}
                  reference={element.id}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  titleSection: {},
  moviesSection: {
    flex: 1,
    flexDirection: "row",
  },
  sectionTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 8,
  },
});
