type DashboardDataProps = {
  host: string;
  userToken: string | null;
};

export type FileProps = {
  id: number;
  name: string;
  poster_path: HTMLImageElement;
};

export type DashboardData = {
  [key: string]: Array<FileProps>;
};

export const getDashboardData = async ({
  host,
  userToken,
}: DashboardDataProps): Promise<DashboardData> => {
  if (!host) throw new Error("No host Provided!");
  // !userToken not be suposed to happen but just in case.. meanwhile development is easier
  if (!userToken) throw new Error("No userToken Provided!");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(userToken as string),
    },
  };
  const dashboardUrl = `http://${host}:8000/api/v1/dashboard`;

  const response = await fetch(dashboardUrl, options);
  if (response.status !== 200) {
    console.log("Failed to fetch dashboard: ", response.body);
    throw new Error("Something went wrong");
  }
  return await response.json();
};
