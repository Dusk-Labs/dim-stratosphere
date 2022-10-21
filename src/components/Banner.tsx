import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import BannerCard from "./BannerCard";
import { rem } from "../../constants/units";
import { useQuery, QueryKey } from "@tanstack/react-query";
import { getBannerData } from "../../api/GetBannerData";

const Banner = () => {
  const { host, userToken } = useAuthContext();
  const [index, setIndex] = useState(0);
  const { data } = useQuery(
    ["getBannerData"] as QueryKey,
    () => getBannerData({ host, userToken }),
    { enabled: userToken !== null && host !== "" }
  );

  useEffect(() => {
    const myI = setInterval(() => {
      if (index < data?.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => clearInterval(myI);
  }, [index, data]);
  return (
    <View style={styles.banner}>
      {data && (
        <BannerCard
          backDrop={data[index].backdrop}
          title={data[index].title}
          year={data[index].year}
          genres={data[index].genres}
          duration={data[index].duration}
          delta={data[index].delta}
          season={data[index].season}
          episode={data[index].episode}
        />
      )}
      <View style={styles.bannerDots}>
        {data &&
          data.map((item, i) => {
            return (
              <View
                key={i}
                style={i === index ? styles.bannerDotOn : styles.bannerDotOff}
              ></View>
            );
          })}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  banner: {
    marginBottom: rem,
  },
  bannerDots: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: rem,
  },
  bannerDotOff: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#0E0D0B",
    margin: 5,
    borderWidth: 2,
    borderColor: "#666666",
  },
  bannerDotOn: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
    borderWidth: 2,
    borderColor: "white",
  },
});
