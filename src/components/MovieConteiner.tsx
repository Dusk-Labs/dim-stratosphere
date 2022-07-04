import { StyleSheet, Text, View, Image } from "react-native";
import React, { FC } from "react";
interface props {
  title: string;
  picture: HTMLImageElement;
  reference: string;
}
const MovieConteiner: FC<props> = ({ title, picture, reference }: props) => {
  return (
    <View style={styles.movieConteiner}>
      <Image source={picture} style={styles.movieImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.reference}>{reference}</Text>
    </View>
  );
};

export default MovieConteiner;

const styles = StyleSheet.create({
  movieConteiner: {
    position: "relative",
    backgroundColor: "black",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  reference: {
    fontSize: 16,
    color: "white",
  },
  movieImage: {
    aspectRatio: 0.63,
    height: "80%",
  },
});
