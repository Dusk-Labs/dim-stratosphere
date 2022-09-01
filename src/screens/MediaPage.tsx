import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  DevSettings,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
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
  const [episodesFiles, setEpisodesFiles] = useState([]);

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
    setEpisodesFiles([]);
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
      if (first) {
        setFirst(false);
      }
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

  useEffect(() => {
    if (data?.media_type === "tv") {
      if (episodes) {
        const config = {
          headers: {
            Authorization: JSON.parse(userToken as string),
          },
        } as any;
        const idArray = episodes.map((element) => {
          return element.id;
        });
        const requests = idArray.map((id) => {
          return fetch(`http://${host}:8000/api/v1/media/${id}/files`, config);
        });
        Promise.all(requests)
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((final) => {
            setEpisodesFiles(final);
          });
      }
    }
  }, [episodes]);

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
  function handleDuration(id) {
    let ans = 0;
    episodesFiles.forEach((element) => {
      if (element[0].media_id === id) {
        ans = element[0].duration;
      }
    });
    return Math.round(ans / 60);
  }
  return (
    <ScrollView style={styles.mediaPage}>
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
                  <Text style={{ ...styles.description, lineHeight: 16 }}>
                    <Text style={styles.InnerDescription}>
                      {handleDescription(data.description)}
                    </Text>
                    {data.description.length > 200 && !first && (
                      <View style={styles.readMoreButtonContainer}>
                        <TouchableOpacity
                          style={styles.readMoreButton}
                          onPress={handleReadMore}
                        >
                          <ReadMoreIcon color={"rgba(173, 173, 173,.34)"} />
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
              <View style={styles.episodes}>
                {episodes &&
                  episodes.map((element) => {
                    return (
                      <TouchableOpacity
                        style={styles.episodePresentation}
                        key={element.id}
                      >
                        <View style={styles.episodePosterContainer}>
                          {element.thumbnail_url ? (
                            <Image
                              source={{
                                uri: `http://${host}:8000/${element.thumbnail_url}`,
                              }}
                              style={styles.episodePoster}
                            />
                          ) : (
                            <View style={styles.episodePosterFailed}>
                              <DimIcon color="white" />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text style={styles.episodeTitle}>
                              {element.name}
                            </Text>
                            <Text style={styles.episodeNumber}>
                              Episode {element.episode}
                            </Text>
                          </View>
                          {episodesFiles && (
                            <Text style={styles.duration}>
                              {handleDuration(element.id)}m
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
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
});
