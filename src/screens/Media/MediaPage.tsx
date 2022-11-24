import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getMediaDetails, Media } from "../../../api/media/GetMediaDetails";
import { Show } from "./Show";
import { Movie } from "./Movie";

export const MediaPage = ({ navigation, route }: any) => {
  const { name, id, comesFromLibrary } = route.params;
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

  const [mediaType, setMediaType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(comesFromLibrary);

  useEffect(() => {
    setIsLoading(true);
  }, [id]);

  useQuery(
    ["getMediaDetails", id] as QueryKey,
    async () => await getMediaDetails({ id, host, userToken }),
    {
      onSuccess: (data) => {
        setMediaData(data);
        setMediaType(data.media_type);
        setIsLoading(false);
      },
    }
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.mediaPage}>
      {mediaType === "tv" ? (
        <Show
          showId={id}
          isLoading={isLoading}
          showName={name}
          navigation={navigation}
          showData={mediaData}
        />
      ) : (
        <Movie
          movieId={id}
          isLoading={isLoading}
          movieName={name}
          navigation={navigation}
          movieData={mediaData}
        />
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
