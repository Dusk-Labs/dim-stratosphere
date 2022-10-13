import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React,{useEffect} from "react";
import { useAuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { rem } from "../../constants/units";

const { width, height } = Dimensions.get("window");

type BannerProps = {
  backDrop: string;
  title: string;
  year: number;
  genres: string[];
};
const BannerCard = ({ backDrop, title, year, genres }: BannerProps) => {
  const { host, userToken } = useAuthContext();  
  return (
    <View style={styles.container}>
      <Image source={{ uri: `${host}/${backDrop}` }} style={styles.image} />
      <LinearGradient
        style={styles.topGradient}
        colors={["black", "transparent"]}
      ></LinearGradient>
      <LinearGradient
        style={styles.bottomGradient}
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
    width,
    aspectRatio: 1.3,
  },
  topGradient:{
    width: "100%",
    height: "50%",
    alignSelf: "baseline",
  },
  image: {
    width,
    aspectRatio: 1.3,
    position: "absolute",
  },
  title: {
    color: "white",
    marginLeft:  rem,
    fontSize:  rem*1.2,
    fontWeight: "600",
    marginBottom:  rem*.5,
  },
  year: {
    color: "white",
    marginLeft:  rem,
    fontWeight:"500",
    fontSize:rem*.7,
    marginBottom:rem*.5

  },
  genres: {
    flexDirection: "row",
    marginLeft:rem*.5,
    marginBottom:rem*.5
  },
  genre: {
    color: "white",
    fontSize: 0.7 * rem,
    fontWeight:"500",
    marginLeft:  rem*.5,

  },
  bottomGradient: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
});
