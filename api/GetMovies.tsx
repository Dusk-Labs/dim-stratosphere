type GetMoviesProps = {
  host: string;
  id: string;
  userToken: string | null;
};

export const getMovies = async ({ host, id, userToken }: GetMoviesProps) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };

  // FIXME: Get rid of manual URL construction, this should be kept in the auth context once we figured out a good host.
  const moviesUrl = `http://${host}:8000/api/v1/library/${id}/media`;
  const response = await fetch(moviesUrl, options);

  if (response.status !== 200) {
    console.log("Failed to fetch movies: ", response.body);
    throw new Error("Something went wrong when fetching movies");
  }

  return await response.json();
};
