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
  duration?: number;
  delta?: number;
  season?: number;
  episode?: number;
};
const BannerCard = ({
  backDrop,
  title,
  year,
  genres,
  duration,
  delta,
  season,
  episode,
}: BannerProps) => {
  const { host, userToken } = useAuthContext();
  function handleDuration(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${Math.floor(duration / 60)}m`;
    }
  }
  function handleButtonText(delta: number) {
    if (delta === 0) {
      return "Play";
    } else {
      return "Resume";
    }
  }
  function handleTitle(
    title: string,
    season: number | undefined,
    episode: number | undefined
  ) {
    if (season && episode) {
      return `${title} S${season}:E${episode}`;
    } else {
      return title;
    }
  }

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
          <Text style={styles.title}>
            {handleTitle(title, season, episode)} {}
          </Text>
          <View style={styles.info}>
            <Text style={styles.year}>{year}</Text>
            <Text style={styles.duration}>{handleDuration(duration)}</Text>
          </View>
        </View>
        <View style={styles.bottomRight}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={{ color: "black", fontWeight: "500" }}>
                {handleButtonText(delta)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dotsIcon}>
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
  duration: {
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
  bottomLeft: {
    width: "60%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomRight: {
    width: "40%",
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  playButton: {
    paddingRight: rem,
    paddingLeft: rem,
    paddingBottom: rem * 0.5,
    paddingTop: rem * 0.5,
    backgroundColor: "#EA963E",
    color: "black",
    borderRadius: 10,
    width: rem * 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsIcon: {
    marginLeft: rem * 1.5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: "white",
    margin: rem * 0.2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: rem * 0.5,
  },
  info: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
