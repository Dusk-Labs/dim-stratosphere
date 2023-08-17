import { QueryKey, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Media } from "../../../api/media/GetMediaDetails";
import { getMultipleEpisodeFile } from "../../../api/media/GetMultipleEpisodeFile";
import { getSeasonData, Season } from "../../../api/media/GetSeasonData";
import {
  Episode,
  getSeasonEpisodes,
} from "../../../api/media/GetSeasonEpisodes";
import { MediaDetails } from "../../components/MediaDetails";
import { SeasonAndEpisodeSelector } from "../../components/SeasonAndEpisodeSelector";
import { useAuthContext } from "../../context/AuthContext";
import { EpisodeFile } from "../../types";

type ShowProps = {
  showId: number;
  showName: string;
  navigation: any;
  showData: Media;
  isLoading: boolean;
};

export const Show = ({
  showId,
  showName,
  navigation,
  showData,
  isLoading,
}: ShowProps) => {
  const { host, userToken } = useAuthContext();

  const [seasonNumber, setSeasonNumber] = useState(1);
  const [seasonsData, setSeasonsData] = useState<Season[] | null>(null);
  const [thisSeasonNumber, setThisSeasonNumber] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesFiles, setEpisodesFiles] = useState<EpisodeFile[]>([]);
  // enable fetch hooks
  const [fetchSeasonEpisodes, setFetchSeasonEpisodes] = useState(false);
  const [fetchSeasonData, setFetchSeasonData] = useState(false);
  const [fetchMultipleEpisodeFile, setFetchMultipleEpisodeFile] =
    useState(false);

  useEffect(() => {
    let fetchData = true;
    if (fetchData) {
      setFetchSeasonData(true);
      setFetchSeasonEpisodes(true);
      setFetchMultipleEpisodeFile(true);
    }
    // to fix unmounting problem
    return () => {
      fetchData = false;
    };
  }, []);

  function handleRigthSeason(
    seasons: Array<Season> | any,
    seasonNumberToUse?: number
  ) {
    const filteredArray = seasons?.filter(
      (element: any) => element.season_number === seasonNumberToUse
    );
    return filteredArray[0]?.id;
  }

  const changeSeason = (season: number) => {
    const seasonId = handleRigthSeason(seasonsData, season);
    setSeasonNumber(season);
    setThisSeasonNumber(seasonId);
    setFetchSeasonData(true);
    setFetchSeasonEpisodes(true);
    setFetchMultipleEpisodeFile(true);
  };

  const { isLoading: isSeasonDataLoading } = useQuery(
    ["getSeasonData", showId || thisSeasonNumber] as QueryKey,
    async () => await getSeasonData({ showId, host, userToken }),
    {
      enabled: fetchSeasonData,
      networkMode: "always",
      refetchOnMount: "always",
      onSuccess: (data) => {
        setSeasonsData(data);
        setFetchSeasonData(false);
        setThisSeasonNumber(handleRigthSeason(data, seasonNumber));
      },
    }
  );

  const { isLoading: isSeasonEpisodesLoading } = useQuery(
    ["getSeasonEpisodes", thisSeasonNumber || showId] as QueryKey,
    async () =>
      await getSeasonEpisodes({ season: thisSeasonNumber, host, userToken }),
    {
      enabled: fetchSeasonEpisodes,
      onSuccess: (data) => {
        setEpisodes(data);
        setFetchSeasonEpisodes(false);
      },
    }
  );

  // ids of season episodes
  const idArray = episodes.map((element: { id: number }) => {
    return element.id;
  });

  const { isLoading: isEpisodesFilesLoading } = useQuery(
    ["getEpisodesFiles", episodes] as QueryKey,
    async () => await getMultipleEpisodeFile({ idArray, host, userToken }),
    {
      enabled: fetchMultipleEpisodeFile,
      onSuccess: (data) => {
        setEpisodesFiles(data);
        setFetchMultipleEpisodeFile(false);
      },
    }
  );

  return (
    <>
      {showData && (
        <MediaDetails
          isLoading={isLoading}
          name={showName}
          navigation={navigation}
          mediaData={showData}
          host={host}
        />
      )}
      {/* seasons & episodes */}
      <SeasonAndEpisodeSelector
        episodes={episodes}
        episodesFiles={episodesFiles}
        seasonNumber={seasonNumber}
        setSeasonNumber={changeSeason}
        seasonsData={seasonsData}
      />
    </>
  );
};
