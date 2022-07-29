import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

type MovieContainerProps = {
  title: string;
  picture: HTMLImageElement;
  reference: string;
};

export const MovieContainer = ({
  title,
  picture,
  reference,
}: MovieContainerProps) => {
  const { host, userToken } = useAuthContext();
  const [info, setInfo] = useState("");
  useEffect(() => {
    const config = {
      headers: {
        Authorization: JSON.parse(userToken as string),
      },
    } as any;

    fetch(`http://${host}:8000/api/v1/media/${reference}/files`, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data[0].raw_year) {
          setInfo(data[0].raw_year);
        } else {
          setInfo(`S${data[0].season}:E${data[0].episode}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [host, reference]);

  return (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `http://${host}:8000/${picture}` }}
        style={styles.movieImage}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.reference}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    position: "relative",
    backgroundColor: "rgba(14, 13, 11, 1)",
    padding: 8,
  },
  title: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 12,
    color: "white",
    fontWeight: "400",
    width: 120,
  },
  reference: {
    fontSize: 14,
    color: "white",
    opacity: 0.7,
  },
  movieImage: {
    aspectRatio: 0.63,
    borderRadius: 5,
  },
});
