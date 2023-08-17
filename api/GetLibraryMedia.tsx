type GetLibraryMediaProps = {
  host: string;
  id: string;
  userToken: string | null;
};

export const getLibraryMedia = async ({
  host,
  id,
  userToken,
}: GetLibraryMediaProps) => {
  const moviesUrl = `${host}/api/v1/library/${id}/media`;
  const options = {
    method: "GET",
    headers: {
      Authorization: userToken as string,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(moviesUrl, options);

  if (response.status !== 200) {
    console.log("Failed to fetch movies: ", response.body);
    throw new Error("Something went wrong when fetching movies");
  }

  return await response.json();
};
