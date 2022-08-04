import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthNavBar } from "../components/AuthNavBar";
import { useAuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
import DownloadIcon from "../components/icons/DownloadIcon"
import SettingsIcon from "../components/icons/SettingsIcon"
import { TouchableOpacity } from "react-native-gesture-handler";

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
        console.log(data)
      });
  }, [id]);

  return (
    <View style={styles.mediaPage}>
      {data && (
        <View style={styles.body}>
          <LinearGradient colors={["gray", "black"]} style={styles.topAndNavBar}>
            <AuthNavBar title={name} navigation={navigation} />
            <View style={styles.top}>
              <View style={styles.topLeft}>
                <Image
                  source={{ uri: `http://${host}:8000/${data.poster_path}` }}
                  style={styles.poster}
                />
              </View>

              <View style={styles.topRigth}>
                <Text style={styles.description}>{data.description}</Text>
                <TouchableOpacity style={styles.playtBtn}>
                  <Text style={{ color: "black", fontWeight: "500", fontSize: 12 }}>
                    Play
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DownloadSeasonBtn}>
                  <View style={{ height: 20, width: 20, marginRight: 8 }}><DownloadIcon color="white" /></View>
                  <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                    Download Season
                  </Text>
                  <View style={{ height: 20, width: 20, position: "absolute", right: "0%", marginRight: 8 }}><SettingsIcon color="#949494" /></View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
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
    borderRadius: 5
  },
  top: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8
  },
  topLeft: {
    marginRight: 8
  },
  topRigth: {
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1
  },
  description: {
    fontSize: 12,
    color: "white",
  },
  topAndNavBar: {
  },
  playtBtn: {
    backgroundColor: "#EA963E",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    justifyContent: "center"
    , alignItems: "center",
    marginTop: 16
  },
  DownloadSeasonBtn: {
    backgroundColor: "#494746",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    justifyContent: "flex-start"
    , alignItems: "center",
    marginTop: 8,
    flexDirection: "row"
  }
});
