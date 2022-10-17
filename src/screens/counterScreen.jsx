import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 100,
          color: "#E64848",
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        {count}
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            setCount(count + 1);
          }}
          style={styles.containerView}
        >
          <Text style={styles.textView}>+1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setCount(0);
          }}
          style={styles.containerView}
        >
          <Text style={styles.textView}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (count > 0) setCount(count - 1);
          }}
          style={styles.containerView}
        >
          <Text style={styles.textView}>-1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerView: {
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#E64848",
    marginBottom: 25,
  },
  textView: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    width: 300,
  },
});
export default Counter;
