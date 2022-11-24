import React from "react";
import { Media } from "../../../api/media/GetMediaDetails";
import { MediaDetails } from "../../components/MediaDetails";

type MovieProps = {
  movieName: string;
  navigation: any;
  movieData: Media;
  movieId: number;
  isLoading: boolean;
};

export const Movie = ({
  // movieId left for future use to play media and more
  movieId,
  movieName,
  navigation,
  movieData,
  isLoading = true,
}: MovieProps) => {
  return (
    <>
      <MediaDetails
        name={movieName}
        navigation={navigation}
        mediaData={movieData}
        isLoading={isLoading}
      />
    </>
  );
};
