import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import MovieContainer from "./MovieContainer";
import { movies } from "../movies";
interface CarouselProps {
  sectionTitle?: string;
  nav: boolean;
}

const Carousel: FC<CarouselProps> = ({ sectionTitle, nav }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          nav
            ? { ...styles.titleSection, flexWrap: "wrap" }
            : styles.titleSection
        }
      >
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>
      <ScrollView style={styles.moviesSection} horizontal={true}>
        {movies.map((element) => {
          return (
            <MovieContainer
              key={element.title}
              title={element.title}
              picture={element.picture}
              reference={element.reference}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  titleSection: {},
  moviesSection: {
    flex: 1,
    flexDirection: "row",
  },
  sectionTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 8,
  },
});
