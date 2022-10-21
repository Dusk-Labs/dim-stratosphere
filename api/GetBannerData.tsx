type BannerDataProps = {
    host: string;
    userToken: string | null;
  };
  type BannerProps = {
    backDrop: string;
    title: string;
    year: number;
    genres: string[];
    duration?: number;
    delta?: number;
    season?: number;
    episode?: number;
  };
  
  export type BannerData = {
    [key: string]: Array<BannerProps>;
  };
  
  export const getBannerData = async ({
    host,
    userToken,
  }: BannerDataProps): Promise<BannerData> => {
    if (!host) throw new Error("No host Provided!");
    // !userToken not be suposed to happen but just in case.. meanwhile development is easier
    if (!userToken) throw new Error("No userToken Provided!");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    };
    const bannerUrl = `${host}/api/v1/dashboard/banner`;
  
    const response = await fetch(bannerUrl, options);
    if (response.status !== 200) {
      console.log("Failed to fetch dashboard: ", response.body);
      throw new Error("Something went wrong");
    }
    return await response.json();
  };
  