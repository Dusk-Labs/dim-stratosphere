// import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage/lib/typescript/AsyncStorage";

// interface InputProps {
//   action: string;
//   key: string;
//   data: Object | string;
// }

// const useAsyncStorage = ({ action, key, data }: InputProps) => {
//   const [value, setValue] = React.useState(null);

//   React.useEffect(() => {
//     if (action === "get") {
//       getData(key);
//     } else if (action === "set") {
//       storeData(key, data);
//     }
//   }, [action, data, value]);

//   const getData = async (key: string) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         typeof value === "string" && setValue(JSON.parse(value));
//         typeof value === "object" && setValue(value);
//       }
//     } catch (e) {
//       // error reading value
//     }
//   };

//   const storeData = async (key: string, value: object | string) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (e) {
//       // saving error
//     }
//   };

//   return [value, setValue];
// };

// export default useAsyncStorage;
