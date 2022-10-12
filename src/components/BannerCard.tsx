import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import React from 'react'
import { useAuthContext } from "../context/AuthContext";

const {width,height}=Dimensions.get('window')

type BannerProps={
    backDrop:string;
    title:string;
    year:number;
    genres:string[];
}
const BannerCard = ({backDrop,title,year,genres}:BannerProps) => {
    const { host, userToken } = useAuthContext();
    console.log(backDrop,"backdrop")
  return (
    <View style={{position:"absolute"}}>
        <Image source={{uri:`${host}/${backDrop}`}} style={styles.image}/>
      <Text style={{color:"white"}}>{title}</Text>
      <Text>{year}</Text>
    </View>
  )
}

export default BannerCard

const styles = StyleSheet.create({
  image:{
    width:width,
    aspectRatio:16/9
  },
})