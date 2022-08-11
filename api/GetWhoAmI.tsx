type GetWhoAmIProps = {
  host: string;
  userToken: string | null;
};

export const getWhoAmI = async ({ host, userToken }: GetWhoAmIProps) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };
  const whoAmIUrl = `http://${host}:8000/api/v1/auth/whoami`;
  let whoAmI = null;
  await fetch(whoAmIUrl, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(async (data) => {
      whoAmI = await data;
    })
    .catch((error) => {
      alert("Error whoAmI fetching: " + error);
    });
  return whoAmI;
};
