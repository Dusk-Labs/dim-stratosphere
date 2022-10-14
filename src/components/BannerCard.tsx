import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { rem } from "../../constants/units";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <View style={styles.bottomLeft}>
          <View style={styles.genres}>
            {genres.map((genre, i) => (
              <Text key={i} style={styles.genre}>
                {genre}
              </Text>
            ))}
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.year}>{year}</Text>
        </View>
        <View style={styles.bottomRight}>
          <View style={styles.buttons}>
          <TouchableOpacity style={styles.playButton}>
            <Text style={{color:"black",fontWeight:"500"}}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dotsIcon  }>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </TouchableOpacity>
          </View>
        </View>
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
  topGradient: {
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
    marginLeft: rem,
    fontSize: rem * 1.2,
    fontWeight: "600",
    marginBottom: rem * 0.5,
  },
  year: {
    color: "white",
    marginLeft: rem,
    fontWeight: "500",
    fontSize: rem * 0.7,
    marginBottom: rem * 0.5,
  },
  genres: {
    flexDirection: "row",
    marginLeft: rem * 0.5,
    marginBottom: rem * 0.5,
  },
  genre: {
    color: "white",
    fontSize: 0.7 * rem,
    fontWeight: "500",
    marginLeft: rem * 0.5,
  },
  bottomGradient: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  bottomLeft:{
    width: "60%",
    height: "100%",
    justifyContent:"flex-end",
  },
  bottomRight: {
    width: "40%",
    height: "100%",
    justifyContent:"flex-start",
    flexDirection:"row",
    alignItems:"flex-end",
  },
  playButton:{
    paddingRight:rem,
    paddingLeft:rem,
    paddingBottom:rem*0.5,
    paddingTop:rem*0.5,
    backgroundColor:"#EA963E",
    color:"black",
    borderRadius:10,
    width:rem*5,
    justifyContent:"center",
    alignItems:"center",
  },
  dotsIcon:{
    marginLeft:rem*2,
  },
  dot:{
    width:rem*.3,
    height:rem*.3,
    borderRadius:10,
    backgroundColor:"white",
    margin:rem*0.2
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:rem*.5
  }
});
