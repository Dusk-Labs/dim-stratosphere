type SeasonEpisodesProps = {
  season: number;
  host: string;
  userToken: string | null;
};

export type Episode = {
  episode: number;
  id: number;
  name: string;
  thumbnail_url: string;
};

export const getSeasonEpisodes = async ({
  season,
  host,
  userToken,
}: SeasonEpisodesProps): Promise<Episode[]> => {
  const url = `${host}/api/v1/season/${season}/episodes`;
  const options = {
    method: "GET",
    headers: {
      Authorization: userToken as string,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (response.status !== 200) {
    console.log("Failed fetch season episodes: " + response.json());
    throw new Error("Failed to fetch season episodes");
  }

  return await response.json();
};
