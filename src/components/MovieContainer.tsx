import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { Media, fetchMediaDetails } from "../../api/media/Media";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

type MovieContainerProps = {
  id: number;
  title: string;
  picture: HTMLImageElement;
  reference: string | number;
};

export const MovieContainer = ({
  id,
  title,
  picture,
  reference,
}: MovieContainerProps) => {
  const { host, userToken } = useAuthContext();
  // FIXME (Val): ideally the dashboard api would return the year as its cheap to obtain.
  const { data } = useQuery(["media", id], () =>
    fetchMediaDetails({ id, host: `http://${host}:8000`, token: userToken! })
  );

  console.log(data);

  return (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `http://${host}:8000/${picture}` }}
        style={{
          ...styles.movieImage,
          width: Dimensions.get("window").width / 3.4,
        }}
      />
      <Text style={styles.title}>{title}</Text>
      {data?.year && <Text style={styles.reference}>{data.year}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    position: "relative",
    paddingBottom: 8,
    paddingTop: 8,
    marginRight: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 12,
    color: "white",
    fontWeight: "400",
    width: 120,
  },
  reference: {
    fontSize: 14,
    color: "white",
    opacity: 0.7,
  },
  movieImage: {
    aspectRatio: 0.63,
    borderRadius: 5,
  },
});
