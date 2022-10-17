import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
const Loaded = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={require("../../assets/loader.json")} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
export default Loaded;
