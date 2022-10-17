import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Button,
} from "react-native";
import ButtonComp from "./Button";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../Services/FirebaseHelper";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import "@firebase/storage";
import Loaded from "./Loader";
import { getUniqueBookName } from "../Services/uniName";

function AddNewBook({ show, onClosePressed }) {
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [imageDownloadUrl, setImageDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    try {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(data);
      setImage(data.uri);
    } catch (e) {
      Alert.alert(e);
    }
  };

  if (permission === false) {
    return (
      <View>
        <Text>
          No Access To Gallary! Please Go To Phone Settings and Allow Access
          first, then Reload Your App..
        </Text>
      </View>
    );
  }

  const UploadImage = async () => {
    if (bookName === "" || bookAuthor === "" || bookDate === "") {
      alert("Please Fill All Fields");
    } else {
      let storageBookRef = firebase.storage().ref("books/");
      let img = await fetch(image);
      let uniqueBookName = getUniqueBookName(bookName);
      let imgBlob = await img.blob();
      storageBookRef
        .child(uniqueBookName)
        .put(imgBlob)
        .then(() => {
          firebase
            .storage()
            .ref("books/" + uniqueBookName)
            .getDownloadURL()
            .then((downloadResponse) => {
              setImageDownloadUrl(downloadResponse);
              alert("Image Saved Now Hit Upload");
            })
            .catch((downloadError) => {
              console.log(downloadError);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const uploadBook = () => {
    if (
      bookName === "" ||
      bookAuthor === "" ||
      bookDate === "" ||
      image === ""
    ) {
      alert("Please Fill All Fields");
    } else {
      //console.log(bookAuthor, bookName, bookDate, imageDownloadUrl);

      // this will get me the user id
      setLoading(true);
      const userId = firebase.auth().currentUser.uid;

      firebase
        .firestore()
        .collection("books")
        .doc(userId)
        .set({
          bookAuthor,
          bookName,
          bookDate,
          imageDownloadUrl,
        })
        .then(() => {
          setLoading(false);
          alert("Book got Uploaded");
        })
        .catch(() => {
          setLoading(false);
        });

      console.log(userId);
    }
  };

  return (
    <ScrollView>
      <Modal
        animationIn={"bounceInLeft"}
        animationInTiming={1000}
        animationOut={"bounceOutRight"}
        animationOutTiming={1000}
        isVisible={show}
      >
        <View style={styles.mainContainer}>
          <View style={styles.formView}>
            <Text style={styles.fromTitle}>Add Your Favourite Book</Text>

            <TextInput
              placeholder="Book Name"
              onChangeText={setBookName}
              style={styles.inputCon}
            />

            <TextInput
              placeholder="Author Name"
              onChangeText={setBookAuthor}
              style={styles.inputCon}
            />

            <TextInput
              placeholder="Date of Published"
              onChangeText={setBookDate}
              style={styles.inputCon}
            />

            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}
              style={styles.uploaderCon}
            >
              <Text style={{ color: "#E64848" }}>Upload Book Cover</Text>
              <FontAwesome5 name="upload" size={35} color="#E64848" />
            </TouchableOpacity>
            {image && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: 150, height: 150 }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    //alignItems: "center",
                    height: 200,
                    width: 200,
                  }}
                >
                  <ButtonComp onPress={UploadImage} title={"upload"} />
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
              marginLeft: 6,
              //marginBottom: -6,
            }}
          >
            <ButtonComp onPress={uploadBook} title={"Add Book"} />

            <ButtonComp onPress={onClosePressed} title={"close"} />
          </View>
        </View>

        {loading && <Loaded />}
      </Modal>
    </ScrollView>
  );
}
export { AddNewBook };
const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: "grey",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "skyblue",
  },
  formView: {
    height: "90%",
    padding: 10,
  },
  fromTitle: {
    fontSize: 24,
    margin: 10,
    fontWeight: "bold",
    color: "#E64848",
  },
  inputCon: {
    padding: 5,
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "#E64848",
  },
  uploaderCon: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    margin: 10,
  },
});
