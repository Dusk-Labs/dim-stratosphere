type GetLibrariesProps = {
  host: string;
  userToken: string | null;
};

export type Library = {
  id: number;
  name: string;
  media_type: string;
  media_count: number;
};

export const getLibraries = async ({
  host,
  userToken,
}: GetLibrariesProps): Promise<Array<Library>> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };
  const librariesUrl = `http://${host}:8000/api/v1/library`;
  const response = await fetch(librariesUrl, options);

  if (response.status !== 200) {
    console.log("Failed to fetch libraries: ", response.body);
    throw new Error("Something went wrong");
  }

  return await response.json();
};
