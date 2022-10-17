import * as React from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

const ButtonComp = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={disabled === true ? styles.disabledContainer : styles.container}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const buttonBaseStyle = {
  width: "60%",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  padding: 10,
  borderRadius: 20,
};

const styles = StyleSheet.create({
  container: {
    ...buttonBaseStyle,
    backgroundColor: "#E64848",
  },
  disabledContainer: {
    ...buttonBaseStyle,
    backgroundColor: "gray",
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
