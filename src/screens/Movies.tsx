import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { MovieContainer } from "../components/MovieContainer";

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
    fetch(`http://${host}:8000/api/v1/library/${id}/media`, config).then((response) => {
      return response.json();
    }).then((data) => {
      setData(data[name]);
      console.log(userToken);
    });
  }, [id]);

  return (
    <View style={styles.moviesPage}>
      <AuthNavBar title={name} navigation={navigation} moviesOrShows={true} />
      <FlatList
      data={data}
      keyExtractor={(element) => element.id}
      renderItem={({ item }) => (
        <MovieContainer
          key={item.id}
          title={item.name}
          picture={item.poster_path}
          reference={item.id}/>
      )}
      numColumns={3}
      />
      {/* <ScrollView style={styles.container}>
         {data&&data.map((element)=>{
          return (<MovieContainer
          key={element.id}
          title={element.name}
          picture={element.poster_path}
          reference={element.id}/>)
        })}
        <Text style={{ color: "white" }}>{name}</Text>
      </ScrollView> */}
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
});
