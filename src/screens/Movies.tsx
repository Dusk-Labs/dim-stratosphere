import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { MovieContainer } from "../components/MovieContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/GetMovies";

export const Movies = ({ route, navigation }: any) => {
  const { name, id } = route.params;
  const { host, userToken } = useAuthContext();
  const [movies, setMovies] = useState();

  const { data } = useQuery(
    ["getMovies"] as QueryKey,
    async () => await getMovies({ host, id, userToken })
  );

  useEffect(() => {
    data && setMovies(data[name]);
  }, [data]);

  return (
    <View style={styles.moviesPage}>
      <AuthNavBar title={name} navigation={navigation} moviesOrShows={true} />
      <View style={styles.body}>
        <FlatList
          data={movies}
          keyExtractor={(element) => element.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                alert(item.name);
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
            paddingRight: 8,
            paddingLeft: 8,
            justifyContent: "space-between",
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
