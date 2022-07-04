import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import MovieConteiner from "./MovieConteiner";
import { movies } from "../movies";
interface props {
  sectionTitle?: string;
}
const Carousel: FC<props> = ({ sectionTitle }) => {
  interface movieInterface {
    title: string;
    reference: string;
    picture: HTMLImageElement;
  }
  return (
    <View style={styles.conteiner}>
      <View style={styles.titleSection}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      </View>
      <ScrollView style={styles.moviesSection} horizontal={true}>
        {movies.map((element) => {
          return (
            <MovieConteiner
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
  conteiner: {
    height: 300,
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
    fontSize: 22,
  },
});
