import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

type BannerProps = {
  backDrop: string;
  title: string;
  year: number;
  genres: string[];
};
const BannerCard = ({ backDrop, title, year, genres }: BannerProps) => {
  const { host, userToken } = useAuthContext();
  console.log(backDrop, "backdrop");
  return (
    <View style={styles.container}>
      <Image source={{ uri: `${host}/${backDrop}` }} style={styles.image} />
      <LinearGradient
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          alignSelf: "baseline",
        }}
        colors={["black", "transparent"]}
      ></LinearGradient>
      <LinearGradient
        style={styles.bannersBottom}
        colors={["transparent", "black"]}
      >
        <View style={styles.genres}>
          {genres.map((genre, i) => (
            <Text key={i} style={styles.genre}>
              {genre}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.year}>{year}</Text>
      </LinearGradient>
    </View>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  container: {
    opacity: 1,
  },
  image: {
    width,
    aspectRatio: 1.3,
  },
  shadow: {
    position: "absolute",
    width,
    aspectRatio: 1.3,
    zIndex: 3,
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 100,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  title: {
    color: "white",
  },
  year: {
    color: "white",
  },
  genres: {
    flexDirection: "row",
  },
  genre: {
    color: "white",
    marginLeft: 5,
  },
  bannersBottom: {
    position: "absolute",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
