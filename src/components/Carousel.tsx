import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MovieContainer } from "./MovieContainer";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { FileProps, getDashboardData } from "../../api/GetDashboardData";
import { useAuthContext } from "../context/AuthContext";
import { NavigationType } from "../types";
import { rem } from "../../constants/units";

type CarouselProps = {
  sectionTitle?: string;
  navigation?: NavigationType;
};

export const Carousel = ({ sectionTitle, navigation }: CarouselProps) => {
  const [dashboardData, setDashboardData] = useState<Array<FileProps>>([]);
  const { host, userToken } = useAuthContext();

  const { data } = useQuery(
    ["getDashboardData"] as QueryKey,
    () => getDashboardData({ host, userToken }),
    {
      enabled: userToken !== null && host !== "",
    }
  );

  useEffect(() => {
    const title: string = sectionTitle?.toUpperCase() || "";
    data && setDashboardData(data[title]);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>
      <ScrollView
        style={styles.moviesSection}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {dashboardData &&
          dashboardData?.map((file: FileProps) => {
            return (
              <TouchableOpacity
                key={file.id}
                onPress={() => {
                  navigation.navigate("MediaPage", {
                    name: file.name,
                    id: file.id,
                  });
                }}
              >
                <MovieContainer
                  id={file.id}
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
    fontSize: rem,
    marginBottom: rem,
    marginLeft: 8,
  },
});
