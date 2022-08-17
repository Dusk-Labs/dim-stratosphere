// This file contains types shared by different parts of the API.

/**
 * Information about chapters in a piece of media.
 */
export interface Chapters {
  credits: number;
}

/**
 * A file belonging to one piece of media, such as a movie or an episode of a
 * TV series.
 */
export interface Version {
  display_name: string;
  file: string;
  id: number;
}

/**
 * A basic representation of one piece of media, such as a movie or TV series.
 */
export interface Media {
  added: string | null;
  backdrop_path: string | null;
  chapters?: Chapters;
  description: string | null;
  duration: number;
  episode?: number;
  genres: string[];
  id: number;
  library_id: number;
  media_type: string;
  name: string;
  next_episode_id?: number;
  play_btn_id?: number;
  poster_path?: string | null;
  prev_episode_id?: number;
  progress: number;
  rating?: number;
  season?: number;
  year?: number;
  tags?: Record<string, Record<string, string>>;
}

type MediaDetailsProps = {
  id: number;
  host: string;
  token: string;
};

export const fetchMediaDetails = async ({
  id,
  host,
  token,
}: MediaDetailsProps): Promise<Media> => {
  const url = `${host}/api/v1/media/${id}`;
  console.log(url);

  // FIXME: The JSON.parse is a bad idea, the token should already be pre-parsed when supplied.
  const options = {
    method: "GET",
    headers: {
      Authorization: JSON.parse(token as string),
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${host}/api/v1/media/${id}`, options);

  if (response.status !== 200) {
    console.log("Failed to query media by id: " + response.json());
    throw new Error("Failed to query media by id");
  }

  return await response.json();
};
