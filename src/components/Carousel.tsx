import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { MovieContainer } from "./MovieContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../api/GetDashboardData";
import { useAuthContext } from "../context/AuthContext";

// const logo = require("../../assets/logo.png");

type CarouselProps = {
  sectionTitle?: string;
  navigation?: any;
};

type FileProps = {
  name: string;
  id: string;
  poster_path: HTMLImageElement;
};

export const Carousel = ({ sectionTitle, navigation }: CarouselProps) => {
  const [dashboardData, setDashboardData] = useState([]);
  const { host, userToken } = useAuthContext();

  const { data, refetch } = useQuery(
    ["getDashboardData"] as QueryKey,
    async () => await getDashboardData({ host, userToken })
  );

  useEffect(() => {
    refetch();
    const title = sectionTitle?.toUpperCase() || "";
    data && setDashboardData(data[title]);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>
      <ScrollView style={styles.moviesSection} horizontal={true}>
        {dashboardData &&
          dashboardData.map((file: FileProps) => {
            return (
              <TouchableOpacity
                key={file.id}
                onPress={() => {
                  alert(file.name);
                }}
              >
                <MovieContainer
                  key={file.id}
                  title={file.name}
                  picture={file.poster_path}
                  reference={file.id}
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
