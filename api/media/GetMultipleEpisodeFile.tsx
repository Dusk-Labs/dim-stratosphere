import { EpisodeFile } from "../../src/types";

type MultipleEpisodeProps = {
  host: string;
  userToken: string | null;
  idArray: number[];
};

export const getMultipleEpisodeFile = async ({
  idArray,
  host,
  userToken,
}: MultipleEpisodeProps): Promise<EpisodeFile[]> => {
  const options = {
    method: "GET",
    headers: {
      Authorization: userToken as string,
      "Content-Type": "application/json",
    },
  };

  const responses = await Promise.all(
    idArray.map((id) => {
      const url = `${host}/api/v1/media/${id}/files`;
      return fetch(url, options);
    })
  );

  if (responses.some((response) => response.status !== 200)) {
    console.log("Failed fetch episode file");
    throw new Error("Failed to fetch episode file");
  }

  return await Promise.all(responses.map((response) => response.json()));
};
