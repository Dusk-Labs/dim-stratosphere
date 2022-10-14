import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import BannerCard from "./BannerCard";
import { rem } from "../../constants/units";

const Banner = () => {
  const [banner, setBanner] = useState();
  const { host, userToken } = useAuthContext();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: userToken,
      },
    } as any;
    if (host) {
      fetch(`${host}/api/v1/dashboard/banner`, config)
        .then((res) => res.json())
        .then((res) => {
          setBanner(res);
          console.log(res);
        });
    }
  }, [host]);

  useEffect(() => {
    const myI = setInterval(() => {
      if (index < banner?.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => clearInterval(myI);
  }, [index, banner]);
  return (
    <View style={styles.banner}>
      {banner && (
        <BannerCard
          backDrop={banner[index].backdrop}
          title={banner[index].title}
          year={banner[index].year}
          genres={banner[index].genres}
          duration={banner[index].duration}
          delta={banner[index].delta}
          season={banner[index].season}
          episode={banner[index].episode}
        />
      )}
      <View style={styles.bannerDots}>
        {banner &&
          banner.map((item, i) => {
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
