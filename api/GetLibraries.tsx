type GetLibrariesProps = {
  host: string;
  userToken: string | null;
};

export const getLibraries = async ({ host, userToken }: GetLibrariesProps) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };
  const librariesUrl = `http://${host}:8000/api/v1/library`;
  let libraries = null;
  await fetch(librariesUrl, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(async (data) => {
      libraries = await data;
    })
    .catch((error) => {
      alert("Error fetching libraries: " + error);
    });
  return libraries;
};
