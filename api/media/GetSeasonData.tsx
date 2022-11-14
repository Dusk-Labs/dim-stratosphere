type SeasonDataProps = {
  host: string;
  userToken: string | null;
  showId: number;
};

export type Season = {
  added: string;
  id: number;
  poster: string;
  season_number: number;
  tvshowid: number;
};

export const getSeasonData = async ({
  showId,
  host,
  userToken,
}: SeasonDataProps): Promise<Season[]> => {
  const url = `${host}/api/v1/tv/${showId}/season`;
  const options = {
    method: "GET",
    headers: {
      Authorization: userToken as string,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (response.status !== 200) {
    console.log("Failed fetch season data: " + response.json());
    throw new Error("Failed to fetch season data");
  }

  return await response.json();
};
