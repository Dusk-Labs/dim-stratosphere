import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

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
  return (
    <View style={styles.movieContainer}>
      <Image source={picture} style={styles.movieImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.reference}>{reference}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    position: "relative",
    backgroundColor: "black",
    flex: 1,
    padding: 8,
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
    height: "80%",
  },
});
