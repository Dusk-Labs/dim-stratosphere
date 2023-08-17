import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { MovieContainer } from "../components/MovieContainer";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getLibraryMedia } from "../../api/GetLibraryMedia";

export const Library = ({ route, navigation }: any) => {
  const { name, id } = route.params;
  const { host, userToken } = useAuthContext();
  const [libraryMedia, setLibraryMedia] = useState();

  const { refetch } = useQuery(
    ["getLibraryMedia"] as QueryKey,
    async () => await getLibraryMedia({ host, id, userToken }),
    {
      onSuccess: (data) => {
        setLibraryMedia(data[name]);
      },
    }
  );

  useEffect(() => {
    refetch().then((data: any) => {
      setLibraryMedia(data[name]);
    });
  }, [id]);

  return (
    <View style={styles.moviesPage}>
      <AuthNavBar title={name} navigation={navigation} moviesOrShows={true} />
      <View style={styles.body}>
        <FlatList
          data={libraryMedia}
          keyExtractor={(element) => element.id}
          // item -> media
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MediaPage", {
                  name: item.name,
                  id: item.id,
                  comesFromLibrary: true,
                });
              }}
            >
              <MovieContainer
                id={item.id}
                key={item.id}
                title={item.name}
                picture={item.poster_path}
                reference={item.id}
              />
            </TouchableOpacity>
          )}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingLeft: 4,
            paddingRight: 4,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  moviesPage: {
    flex: 1,
    backgroundColor: "rgba(14, 13, 11, 1)",
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
