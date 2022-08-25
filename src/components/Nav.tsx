import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SettingsIcon from "./icons/SettingsIcon";
import MoviesICon from "./icons/MoviesIcon";
import ShowsIcon from "./icons/ShowsIcon";
import LogOutIcon from "./icons/LogOutIcon";
import { useAuthContext } from "../context/AuthContext";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Library, getLibraries } from "../../api/GetLibraries";
import { getWhoAmI } from "../../api/GetWhoAmI";
import {rem} from "../../constants/units";

const userImage = require("../../assets/logo.png");

type NavProps = {
  navigation: any;
};

type UserType = {
  picture: string;
  roles: Array<string>;
  spentWatching: number;
  username: string;
};

export const Nav = ({ ...props }: NavProps) => {
  const { signOut, host, userToken } = useAuthContext();
  const [user, setUser] = useState<UserType>();
  const [libraries, setLibraries] = useState<Array<Library>>([]);

  const { data: librariesFetched } = useQuery(
    ["getLibraries"] as QueryKey,
    async () => host && userToken && (await getLibraries({ host, userToken }))
  );

  const { data: whoAmI } = useQuery(
    ["getWhoAmI"] as QueryKey,
    async () => host && userToken && (await getWhoAmI({ host, userToken }))
  );

  useEffect(() => {
    librariesFetched && setLibraries(librariesFetched);
    whoAmI && setUser(whoAmI);
  }, [librariesFetched, whoAmI]);

  return (
    <>
      <View style={styles.nav}>
        <View style={styles.header}>
          <View style={styles.left}>
            <View style={styles.imageContainer}>
              {user?.picture && (
                <Image
                  source={
                    user ? `http://${host}:8000${user.picture}` : userImage
                  }
                  style={styles.userImage}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.useInfo}>
              <Text style={styles.userName}>{user?.username}</Text>
              <Text style={styles.timeWatched}>
                Watched {user?.spentWatching}h
              </Text>
            </View>
          </View>
          <View style={styles.rigth}>
            <TouchableOpacity
              style={styles.configBtn}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            >
              <SettingsIcon color={"#7E7E7E"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => {
                signOut();
              }}
            >
              <LogOutIcon color={"#7E7E7E"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.libraries}>LIBRARIES</Text>

          {libraries &&
            libraries.map((library: Library) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Movies", {
                      name: library.name,
                      id: library.id,
                    });
                  }}
                  style={styles.library}
                  key={library.id}
                >
                  <View style={styles.section}>
                    <View style={styles.iconAndText}>
                      <View>
                        {library.media_type === "movie" ? (
                          <MoviesICon color="#7E7E7E" />
                        ) : (
                          <ShowsIcon color={"#7E7E7E"} />
                        )}
                      </View>
                      <Text style={styles.sectionTitle}>{library.name}</Text>
                    </View>
                    <Text style={styles.itemsNumber}>
                      {library.media_count || 0}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemsNumber: {
    backgroundColor: "rgba(234, 150, 62, 0.5)",
    borderRadius: 30,
    paddingHorizontal: 8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "white",
    fontSize: 12,
  },
  sectionTitle: {
    fontWeight: "400",
    marginLeft: rem,
    fontSize: 14,
    color: "white",
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingRight: rem,
    paddingLeft: rem,
  },
  body: {
    padding: rem,
    paddingTop: rem * 2,
    flex: 1,
  },
  libraries: {
    color: "#EA963E",
    fontWeight: "500",
    fontSize: 12,
    marginBottom: rem,
  },
  logOutIcon: {
    height: 20,
    width: 20,
  },
  nav: {
    flex: 1,
    backgroundColor: "#252525",
  },
  imageContainer: {
    borderColor: "white",
    borderRadius: 50,
    borderWidth: 2,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: rem,
    backgroundColor: "#de9636",
  },
  header: {
    width: "100%",
    marginTop: rem * 2,
    height: rem * 5,
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: rem,
  },
  rigth: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
  userImage: {
    borderRadius: 50,
    width: 40,
    height: 40,
    borderColor: "white",
    borderWidth: 2,
  },
  useInfo: {
    flexDirection: "column",
  },
  userName: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  timeWatched: {
    color: "gray",
    fontSize: 12,
  },
  configBtn: {
    marginRight: rem,
  },
  logOutBtn: {
    marginRight: rem,
  },
  library: {
    marginTop: rem,
    width: "100%",
  },
});
