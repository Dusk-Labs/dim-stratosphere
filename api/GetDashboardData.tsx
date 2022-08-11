type DashboardDataProps = {
  host: string;
  userToken: string | null;
};

export const getDashboardData = async ({
  host,
  userToken,
}: DashboardDataProps) => {
  if (!host) return alert("No host Provided!");
  // !userToken not be suposed to happen but just in case.. meanwhile development is easier
  if (!userToken) return alert("No userToken Provided!");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };
  const dashboardUrl = `http://${host}:8000/api/v1/dashboard`;

  let dashboardData = null;

  await fetch(dashboardUrl, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(async (data) => {
      dashboardData = await data;
    })
    .catch((error) => {
      alert("Error signing up: " + error);
    });

  return dashboardData;
};
