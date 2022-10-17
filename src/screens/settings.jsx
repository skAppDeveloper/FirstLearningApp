import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
    </View>
  );
};
export default Settings;

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
