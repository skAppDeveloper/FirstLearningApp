import React from "react";
import { Text, View, SafeAreaView, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
/**const listData = [
  { id: 4, name: "Shoaib", Age: 24 },
  { id: 41, name: "Shoaib2", Age: 25 },
  { id: 42, name: "Shoaib3", Age: 26 },
  { id: 43, name: "Shoaib4", Age: 36 },
  { id: 44, name: "Shoaib5", Age: 46 },
  { id: 45, name: "Shoaib6", Age: 43 },
  { id: 46, name: "Shoaib7", Age: 37 },
  { id: 47, name: "Shoaib8", Age: 38 },
];**/
const Practice = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get("https://api.github.com/users")
      .then((response) => {
        console.log(response.data[0]);
        setUsers(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        //horizontal
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#f9c2ff",
              padding: 20,
              marginVertical: 8,
              marginHorizontal: 16,

              width: 100,
              height: 120,
            }}
          >
            <Text>{item.login}</Text>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{ uri: item.avatar_url }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Practice;
