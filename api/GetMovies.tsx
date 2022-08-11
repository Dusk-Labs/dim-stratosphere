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
  const moviesUrl = `http://${host}:8000/api/v1/library/${id}/media`;
  let movies = null;
  await fetch(moviesUrl, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(async (data) => {
      movies = await data;
    })
    .catch((error) => {
      alert("Error signing up: " + error);
    });
  return movies;
};
