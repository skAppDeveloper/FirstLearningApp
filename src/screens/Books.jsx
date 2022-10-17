import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { AddNewBook } from "../components/Modal";
import { firebase } from "../Services/FirebaseHelper";
import "firebase/firestore";

const Books = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);
  function onClosePressed() {
    setShow(!show);
  }

  // when app opens home page fetch user books please
  useEffect(() => {
    fetchBookfromFirebase();
  }, []);

  const fetchBookfromFirebase = () => {
    firebase
      .firestore()
      .collection("books")
      .onSnapshot((querySnapshot) => {
        const books = [];
        querySnapshot.forEach((res) => {
          books.push(res.data());
          //let ArrayOfBooks = books.push(res.data());
          // setBooks(ArrayOfBooks);
          //setBooks([...books, res.data()]);
          /// check kro k collection ma koi data aya b h k nei
          //if (res.data()) {
          // check kro k book ke array ma data aya be h ya nei
          //if (books.length) {
          // agr data ageya tha to
          // setBooks([...books, res.data()]);
          // } else {
          //   books ke array ma data daal 2
          // books.push(res.data());
          //   }
          // }
        });
        setBooks(books);
      });
  };

  // this will be each book in the list design card
  const renderItem = ({ item }) => (
    <View
      style={{
        //padding: 10,
        margin: 10,
        backgroundColor: "grey",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Image
        style={{ width: 150, height: 150 }}
        source={
          item.imageDownloadUrl !== ""
            ? { uri: item.imageDownloadUrl }
            : require("../../assets/images/notfound.jpg")
        }
        resizeMode={"stretch"}
      />

      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {item.bookName}
        </Text>

        <Text style={{ fontSize: 20 }}>Written By</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {item.bookAuthor}
        </Text>
        <Text style={{ fontSize: 20 }}>Published In</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {item.bookDate}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: "100%", height: "100%" }}>
        <FlatList
          data={books}
          renderItem={renderItem}
          onRefresh={() => fetchBookfromFirebase()}
          refreshing={false}
          //horizontal
          //numColumns={2}
        />

        <FloatingAction
          showBackground={false}
          onPressMain={() => {
            setShow(!show);
          }}
          color="blue"
        />
      </View>
      <AddNewBook show={show} onClosePressed={onClosePressed} />
    </SafeAreaView>
  );
};
export default Books;
