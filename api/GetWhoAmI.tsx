import { WhoAmI } from "../src/types";

type GetWhoAmIProps = {
  host: string;
  userToken: string | null;
};

export const getWhoAmI = async ({
  host,
  userToken,
}: GetWhoAmIProps): Promise<WhoAmI> => {
  const whoAmIUrl = `${host}/api/v1/auth/whoami`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      method: "GET",
      Authorization: userToken as string,
    },
  };

  const response = await fetch(whoAmIUrl, options);

  if (response.status !== 200) {
    console.log("Failed to fetch whoami: ", response.body);
    throw new Error("Something went wrong");
  }
  return await response.json();
};
