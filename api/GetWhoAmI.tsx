type GetWhoAmIProps = {
  host: string;
  userToken: string | null;
};

type WhoAmI = {
  picture: any;
  spentWatching: number;
  username: String;
  roles: Array<String>;
};

export const getWhoAmI = async ({
  host,
  userToken,
}: GetWhoAmIProps): Promise<WhoAmI> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };
  const whoAmIUrl = `http://${host}:8000/api/v1/auth/whoami`;
  const response = await fetch(whoAmIUrl, options);

  if (response.status !== 200) {
    console.log("Failed to fetch whoami: ", response.body);
    throw new Error("Something went wrong");
  }
  return await response.json();
};
