import * as React from "react";
import { Image, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import viaTrading from "../../assets/images/viaTrading.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Splash = ({ navigation }) => {
  useEffect = () => {
    AsyncStorage.get("@is_logged_in")
      .then((value) => {
        if (value !== null) {
          setTimeout(() => {
            navigation.replace("HomeNav");
          }, 2000);
          return value;
        } else {
          setTimeout(() => {
            navigation.replace("SignUp");
          }, 2000);
          return "false";
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        flex: 1,
      }}
    >
      <StatusBar style="light" backgroundColor="#710000" />
      <Image
        source={viaTrading}
        style={{
          width: 200,
          height: 200,
          borderRadius: 200,
          marginBottom: 40,
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          color: "#E64848",
        }}
      >
        Welcome Here!
      </Text>
    </View>
  );
};
export default Splash;
