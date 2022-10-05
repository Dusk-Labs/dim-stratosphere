import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import DimIcon from "../components/icons/DimIcon";

type MovieContainerProps = {
  id: number;
  title: string;
  picture: HTMLImageElement | null | undefined;
  reference: string;
};

export const MovieContainer = ({
  id,
  title,
  picture,
  reference,
}: MovieContainerProps) => {
  const { host } = useAuthContext();

  return (
    <View style={styles.movieContainer}>
      {picture ? (
        <Image
        source={{ uri: `${host}/${picture}` }}
          style={{
            ...styles.movieImage,
            width: Dimensions.get("window").width / 3.5,
          }}
          resizeMode="contain"
        />
      ) : (
        <View
          style={{
            ...styles.iconContainer,
            width: Dimensions.get("window").width / 3.5,
          }}
        >
          <DimIcon color="white" width={70} heigth={40} />
        </View>
      )}
      <Text
        style={{ ...styles.title, width: Dimensions.get("window").width / 3.5 }}
      >
        {title}
      </Text>
      <Text style={styles.reference}>{reference}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    position: "relative",
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 8,
    paddingLeft: 8,
  },
  title: {
    marginTop: 8,
    marginBottom: 2,
    fontSize: 12,
    color: "white",
    fontWeight: "400",
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
  iconContainer: {
    aspectRatio: 0.63,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 5,
  },
});
