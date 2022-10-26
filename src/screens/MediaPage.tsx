import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import DropDown from "../components/DropDown";
import ReadMoreIcon from "../components/icons/ReadMore";
import DimIcon from "../components/icons/DimIcon";
import { LinearGradient } from "expo-linear-gradient";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getMediaDetails, Media } from "../../api/media/getMediaDetails";
import { Episode, getSeasonEpisodes } from "../../api/media/GetSeasonEpisodes";
import { getSeasonData, Season } from "../../api/media/GetSeasonData";
import { EpisodeFile } from "../types";
import { getMultipleEpisodeFile } from "../../api/media/GetMultipleEpisodeFile";

export const MediaPage = ({ navigation, route }: any) => {
  const { name, id } = route.params;
  const { host, userToken } = useAuthContext();
  const [mediaData, setMediaData] = useState<Media>({
    added: null,
    backdrop_path: null,
    description: "",
    duration: 0,
    genres: [],
    id: 0,
    library_id: 0,
    media_type: "",
    name: "",
    progress: 0,
  });

  const [season, setSeason] = useState<Season[] | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [first, setFirst] = useState(true);
  const [isReadMoreActive, setIsreadMoreActive] = useState(false);
  const [episodesFiles, setEpisodesFiles] = useState<EpisodeFile[]>([]);
  const [fetchSeasonEpisodes, setFetchSeasonEpisodes] = useState(false);
  const [thisSeason, setThisSeason] = useState(1);
  const [fetchSeasonData, setFetchSeasonData] = useState(false);
  const [fetchMultipleEpisodeFile, setFetchMultipleEpisodeFile] =
    useState(false);

  useQuery(
    ["getMedia", id] as QueryKey,
    async () => await getMediaDetails({ id, host, userToken }),
    {
      enabled: true,
      onSuccess: (data) => {
        setMediaData(data);
        setSeasonNumber(1);
        setFirst(true);
        setSeason(null);
        setIsreadMoreActive(false);
        setEpisodesFiles([]);
      },
    }
  );

  useQuery(
    ["getSeasonEpisodes", seasonNumber || season] as QueryKey,
    async () =>
      await getSeasonEpisodes({ season: thisSeason, host, userToken }),
    {
      enabled: fetchSeasonEpisodes,
      onSuccess: (data) => {
        setEpisodes(data);
        setFetchSeasonEpisodes(false);
      },
    }
  );

  useQuery(
    ["getSeasonData", id] as QueryKey,
    async () => await getSeasonData({ id, host, userToken }),
    {
      enabled: fetchSeasonData,
      onSuccess: (data) => {
        setSeason(data);
        setFetchSeasonData(false);
      },
    }
  );

  const idArray = episodes.map((element: { id: number }) => {
    return element.id;
  });

  useQuery(
    ["getEpisodesFiles", episodes] as QueryKey,
    async () => await getMultipleEpisodeFile({ idArray, host, userToken }),
    {
      enabled: fetchMultipleEpisodeFile,
      onSuccess: (data) => {
        setEpisodesFiles(data);
        setFetchMultipleEpisodeFile(false);
      },
    }
  );

  useEffect(() => {
    if (season) {
      setThisSeason(handleRigthSeason(season));
      setFetchSeasonEpisodes(true);
    }
  }, [season, seasonNumber]);

  // brings seasons info if data.media_type is "tv"
  useEffect(() => {
    if(mediaData){
    if (mediaData.media_type === "tv") {
      setFetchSeasonData(true);
      console.log("serie....")
    } else if(mediaData.media_type === "movie"){
      setSeason(null);
      setEpisodes([]);
        if (first) {
        setFirst(false);
      } 
      console.log("pelicula....")
    }
  }
  }, [mediaData]);

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
    if (mediaData?.media_type === "tv") {
      if (episodes) {
        setFetchMultipleEpisodeFile(true);
      }
    }
  }, [episodes]);

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
  function handleDuration(id: number) {
    let durationInSec = 0;
    const flatArray = episodesFiles.flat();
    flatArray.forEach((element: EpisodeFile) => {
      if (element.media_id === id) {
        durationInSec = element.duration;
      }
    });
    return Math.round(durationInSec / 60);
  }

  return (
    <ScrollView style={styles.mediaPage}>
      {mediaData && (
        <View style={styles.body}>
          <LinearGradient
            colors={["gray", "black"]}
            style={styles.topAndNavBar}
          >
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
                    {mediaData.description &&
                      mediaData.description.length > 200 &&
                      !first && (
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
                  options={season.map((element: any) => {
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
                  episodes.map((element: any) => {
                    return (
                      <TouchableOpacity
                        style={styles.episodePresentation}
                        key={element.id}
                      >
                        <View style={styles.episodePosterContainer}>
                          {element.thumbnail_url ? (
                            <Image
                              source={{
                                uri: `${host}/${element.thumbnail_url}`,
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
