import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";

export const MediaPage = ({ navigation, route }: any) => {
  const { name, id } = route.params;
  const { host, userToken } = useAuthContext();
  const [data, setData] = useState();

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
        console.log(data.poster_path);
      });
  }, [id]);

  return (
    <View style={styles.mediaPage}>
      <AuthNavBar title={name} navigation={navigation} />
      {data && (
        <View style={styles.body}>
          <Image
            source={{ uri: `http://${host}:8000/${data.poster_path}` }}
            style={styles.poster}
          />
          <Text style={{color:"white"}}>{data.description}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:8,
    paddingRight:8
  },
  poster: {
    aspectRatio: 0.63,
    width: 133,
  },
});
