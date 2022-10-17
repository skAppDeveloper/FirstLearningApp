import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const Gift = () => {
  let explosion;
  const startExplosion = () => explosion.start();

  const stopExplosion = () => explosion.stop();

  const resumeExplosion = () => explosion.resume();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        ref={(ref) => {
          explosion = ref;
        }}
      />
      <View>
        <TouchableOpacity
          onPress={startExplosion}
          isDefault={true}
          style={{
            borderRadius: 20,
            padding: 20,
            justifyContent: "center",
            width: "90%",
            backgroundColor: "#E64848",
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              width: 300,
            }}
          >
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={stopExplosion}
          isPrimary={true}
          style={{
            borderRadius: 20,
            padding: 20,
            justifyContent: "center",
            width: "90%",
            backgroundColor: "#E64848",
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              width: 300,
            }}
          >
            Stop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resumeExplosion}
          isSecondary={true}
          style={{
            borderRadius: 20,
            padding: 20,
            justifyContent: "center",
            width: "90%",
            backgroundColor: "#E64848",
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              width: 300,
            }}
          >
            Resume
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Gift;
