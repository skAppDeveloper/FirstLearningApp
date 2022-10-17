import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { firebaseApp } from "../Services/FirebaseHelper";
const Home = (navigation) => {
  return (
    <WebView
      source={{ uri: "https://paakimegatools.blogspot.com" }}
      style={{ marginTop: StatusBar.height }}
    />
  );
};
export default Home;
const styles = StyleSheet.create({
  btnCo: {
    width: 320,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  userBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
