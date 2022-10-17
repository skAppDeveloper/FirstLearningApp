import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import ButtonComp from "../components/Button";

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (e) {
        Alert.alert(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "red",
            fontSize: 16,
          }}
        >
          No Access To Camera! Please Go To Phone Settings and Allow Camera
          Access first, then Reload Your App..
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraCon}>
        <Camera
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
          ref={cameraRef}
        />
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          width: "70%",
          margin: 10,
          marginLeft: 30,
        }}
      >
        <ButtonComp
          title={"Flip Camera"}
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
        <ButtonComp title={"Take Picture"} onPress={takePicture} />
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            marginTop: 10,
          }}
        />
      )}
    </View>
  );
};
export default CameraScreen;

const styles = StyleSheet.create({
  cameraCon: {
    width: "100%",
    flexDirection: "row",
  },
  fixedRatio: {
    width: "80%",
    height: 100,
    aspectRatio: 1,
    alignContent: "center",
    marginLeft: 35,
    marginTop: 10,
  },
});
