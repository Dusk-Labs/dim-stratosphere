import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

type MovieContainerProps = {
  title: string;
  picture: HTMLImageElement;
  reference: string;
};

export const MovieContainer = ({
  title,
  picture,
  reference,
}: MovieContainerProps) => {
  const { host } = useAuthContext();
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
      <Text style={styles.reference}>{reference}</Text>
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
