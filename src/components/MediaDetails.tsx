import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthNavBar } from "./AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import ReadMoreIcon from "./icons/ReadMore";
import { Media } from "../../api/media/GetMediaDetails";

type MediaDetailsProps = {
  name: string;
  navigation: any;
  mediaData: Media;
  isLoading?: boolean;
  host?: string;
};

export const MediaDetails = ({
  name,
  navigation,
  mediaData,
  isLoading = true,
}: MediaDetailsProps) => {
  const { host } = useAuthContext();
  const [isReadMoreActive, setIsreadMoreActive] = useState(false);

  // todo hanlde description = null
  function handleDescription(description: string = "description mock") {
    if (isReadMoreActive) {
      return description;
    } else {
      if (description.length > 200) {
        return description.slice(0, 200) + "...  ";
      } else {
        return description;
      }
    }
  }

  function handleReadMore() {
    setIsreadMoreActive(!isReadMoreActive);
  }

  if (isLoading) {
    return (
      isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )
    );
  }

  return (
    <View style={styles.body}>
      <LinearGradient colors={["gray", "black"]} style={styles.topAndNavBar}>
        <AuthNavBar title={name} navigation={navigation} />
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Image
              source={{ uri: `${host}/${mediaData.poster_path}` }}
              style={styles.poster}
            />
          </View>

          <View style={styles.topRigth}>
            <View style={styles.descriptionContainer}>
              <Text style={{ ...styles.description, lineHeight: 16 }}>
                <Text style={styles.InnerDescription}>
                  {handleDescription(mediaData.description)}
                </Text>
                {mediaData.description && mediaData.description.length > 200 && (
                  <View style={styles.readMoreButtonContainer}>
                    <TouchableOpacity
                      style={styles.readMoreButton}
                      onPress={handleReadMore}
                    >
                      <ReadMoreIcon color={"rgba(173, 173, 173,.34)"} />
                    </TouchableOpacity>
                  </View>
                  // eslint-disable-next-line indent
                )}
              </Text>
            </View>
            <TouchableOpacity style={styles.playtBtn}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "500",
                  fontSize: 12,
                }}
              >
                Play
              </Text>
            </TouchableOpacity>
            {/*   <TouchableOpacity style={styles.DownloadSeasonBtn}>
                  <View style={{ height: 20, width: 20, marginRight: 8 }}><DownloadIcon color="white" /></View>
                  <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                    Download Season
                  </Text>
                  <View style={{ height: 20, width: 20, position: "absolute", right: "0%", marginRight: 8 }}><SettingsIcon color="#949494" /></View>
                </TouchableOpacity> */}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaPage: {
    flex: 1,
    backgroundColor: "black",
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
  },
  poster: {
    aspectRatio: 0.63,
    width: 133,
    borderRadius: 5,
  },
  top: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
  },
  topLeft: {
    marginRight: 8,
  },
  topRigth: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
  },
  description: {
    textAlign: "left",
  },
  InnerDescription: {
    fontSize: 12,
    color: "white",
  },
  topAndNavBar: {
    marginBottom: 16 * 3,
  },
  playtBtn: {
    backgroundColor: "#EA963E",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  DownloadSeasonBtn: {
    backgroundColor: "#494746",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
  },
  seasonElection: {
    flex: 1,
    paddingRight: 8,
    paddingLeft: 8,
  },
  episodes: {
    flex: 1,
  },
  episodePresentation: {
    flex: 1,
    marginBottom: 16,
  },
  episodePosterContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginBottom: 16,
    borderRadius: 10,
  },
  episodePoster: {
    borderRadius: 10,
    width: "100%",
    aspectRatio: 0.6,
    position: "absolute",
    top: "-10%",
  },
  episodePosterFailed: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  episodeTitle: {
    color: "white",
    fontWeight: "500",
    marginBottom: 8,
  },
  episodeNumber: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
    opacity: 0.8,
  },
  descriptionContainer: {
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  readMoreButton: {
    width: 30,
    height: 12,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  readMoreButtonContainer: {
    width: 30,
    height: 20,
    justifyContent: "flex-end",
  },
  duration: {
    color: "#7E7E7E",
    fontWeight: "400",
    fontSize: 14,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
