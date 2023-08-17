import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { EpisodeFile } from "../types";
import DropDown from "./DropDown";
import DimIcon from "./icons/DimIcon";

export const SeasonAndEpisodeSelector = ({
  episodes,
  episodesFiles,
  seasonNumber,
  setSeasonNumber,
  seasonsData,
}: any) => {
  const { host } = useAuthContext();

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
    <>
      {episodes && seasonNumber && seasonsData && (
        <View style={styles.seasonElection}>
          <View style={{ width: "45%", marginBottom: 16 }}>
            <DropDown
              kind={"Season"}
              options={seasonsData.map((season: any) => {
                return season.season_number;
              })}
              setOption={setSeasonNumber}
              season={seasonsData}
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
                        <Text style={styles.episodeTitle}>{element.name}</Text>
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
    </>
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
