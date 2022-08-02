import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { MovieContainer } from "../components/MovieContainer";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Movies = ({ route, navigation }: any) => {
  const { name, id } = route.params;
  const { host, userToken } = useAuthContext();
  const [data, setData] = useState();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: JSON.parse(userToken as string),
      },
    } as any;
    fetch(`http://${host}:8000/api/v1/library/${id}/media`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data[name]);
        console.log(userToken);
      });
  }, [id]);

  return (
    <View style={styles.moviesPage}>
      <AuthNavBar title={name} navigation={navigation} moviesOrShows={true} />
      <View style={styles.body}>
        <FlatList
          data={data}
          keyExtractor={(element) => element.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                alert(item.name)
              }}
            >
              <MovieContainer
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
