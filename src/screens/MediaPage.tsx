import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  DevSettings,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import DownloadIcon from "../components/icons/DownloadIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDown from "../components/DropDown";
import ReadMoreIcon from "../components/icons/ReadMore";
import DimIcon from "../components/icons/DimIcon";

export const MediaPage = ({ navigation, route }: any) => {
  const { name, id } = route.params;
  const { host, userToken } = useAuthContext();
  const [data, setData] = useState(null);
  const [season, setSeason] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [first, setFirst] = useState(true);
  const [isReadMoreActive, setIsreadMoreActive] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: JSON.parse(userToken as string),
      },
    } as any;
    fetch(`http://${host}:8000/api/v1/media/${id}`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
    setSeasonNumber(1);
    setFirst(true);
    setSeason(null);
    setIsreadMoreActive(false);
  }, [id]);

  useEffect(() => {
    if (data && data.media_type === "tv") {
      const config = {
        headers: {
          Authorization: JSON.parse(userToken as string),
        },
      } as any;
      fetch(`http://${host}:8000/api/v1/tv/${id}/season`, config)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setSeason(data);
        });
    } else {
      setSeason(null);
      setEpisodes(null);
    }
  }, [data]);

  function handleRigthSeason(seasons: Array<any>) {
    const filteredArray = seasons.filter(
      (element) => element.season_number === seasonNumber
    );
    if (first) {
      return seasons[0].id;
    } else {
      return filteredArray[0].id;
    }
  }

  useEffect(() => {
    if (season) {
      const config = {
        headers: {
          Authorization: JSON.parse(userToken as string),
        },
      } as any;
      const thisSeason = handleRigthSeason(season);
      fetch(`http://${host}:8000/api/v1/season/${thisSeason}/episodes`, config)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEpisodes(data);
        });
    }
  }, [season, seasonNumber]);

  function handleDescription(description) {
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
  return (
    <View style={styles.mediaPage}>
      {data && (
        <View style={styles.body}>
          <LinearGradient
            colors={["gray", "black"]}
            style={styles.topAndNavBar}
          >
            <AuthNavBar title={name} navigation={navigation} />
            <View style={styles.top}>
              <View style={styles.topLeft}>
                <Image
                  source={{ uri: `http://${host}:8000/${data.poster_path}` }}
                  style={styles.poster}
                />
              </View>

              <View style={styles.topRigth}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    {handleDescription(data.description)}
                    {data.description.length > 200 && !first && (
                      <View style={styles.readMoreButtonContainer}>
                        <TouchableOpacity
                          style={styles.readMoreButton}
                          onPress={handleReadMore}
                        >
                          <ReadMoreIcon color={"#ADADAD"} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </Text>
                </View>
                <TouchableOpacity style={styles.playtBtn}>
                  <Text
                    style={{ color: "black", fontWeight: "500", fontSize: 12 }}
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
          {episodes && season && (
            <View style={styles.seasonElection}>
              <View style={{ width: "45%", marginBottom: 16 }}>
                <DropDown
                  kind={"Season"}
                  options={season.map((element) => {
                    return element.season_number;
                  })}
                  setOption={setSeasonNumber}
                  first={first}
                  setFirst={setFirst}
                  season={season}
                />
              </View>
              <ScrollView style={styles.episodes}>
                {episodes &&
                  episodes.map((element) => {
                    return (
                      <TouchableOpacity
                        style={styles.episodePresentation}
                        key={element.id}
                      >
                        <View style={styles.episodePosterContainer}>
                          {element.thumbnail_url ?
                            <Image
                              source={{
                                uri: `http://${host}:8000/${element.thumbnail_url}`
                              }}
                              style={styles.episodePoster}
                            /> : <View style={styles.episodePosterFailed}><DimIcon color="white" /></View>
                          }
                        </View>
                        <Text style={styles.episodeTitle}>{element.name}</Text>
                        <Text style={styles.episodeNumber}>
                          Episode {element.episode}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          )}
        </View>
      )}
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
    fontSize: 12,
    color: "white",
    flexDirection: "row",
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
    alignItems: "center"
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
  },
  readMoreButton: {
    width: 30,
    height: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    top: 5,
  },
  readMoreButtonContainer: {
    width: 30,
    height: 20,
    justifyContent: "flex-end",
  },
});
