import React, { useEffect, useReducer } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import viaTrading from "../../assets/images/viaTrading.png";
import Login from "../screens/login/login";
import Home from "../screens/Home";
import Books from "../screens/Books";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "../screens/register/register";
import Details from "../screens/Detailed";
import TrackYourself from "../screens/Location";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import CameraScreen from "../screens/camera";
import { removeUserSession } from "../Services/sessionHelper";
import ButtonComp from "../components/Button";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        height: "30",
        drawerStyle: {
          backgroundColor: "#f6c6f8",
        },
        headerStyle: {
          backgroundColor: "#f6c6f8",
        },
        //headerTitle: "More",
        headerStatusBarHeight: -10,
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  marginBottom: 10,
                  backgroundColor: "#f6e6f8",
                  marginTop: -30,
                }}
              >
                <View>
                  <Text>Shoaib Khan</Text>
                  <Text>m@gmail.com</Text>
                </View>
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?cs=srgb&dl=pexels-marianna-ole-757889.jpg&fm=jpg",
                  }}
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                />
              </View>

              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <ButtonComp
              title={"Logout"}
              onPress={() => {
                Alert.alert("Caution!", "Are You Sure?", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Confirm",
                    onPress: () => removeUserSession(navigation),
                  },
                ]);
              }}
            />
          </View>
        );
      }}
    >
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen name="Track Yourself" component={TrackYourself} />
    </Drawer.Navigator>
  );
}

function HomeNav() {
  return (
    <View style={{ flex: 1, marginTop: 24 }}>
      <StatusBar style="light" backgroundColor="#710000" />
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={"Home"}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "ios-home-outline"}
                size={24}
                color={focused ? "blue" : "grey"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Books"
          component={Books}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={24}
                color={focused ? "blue" : "grey"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "videocam" : "videocam-outline"}
                size={24}
                color={focused ? "blue" : "grey"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={DrawerNav}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name={focused ? "pluscircle" : "pluscircleo"}
                size={24}
                color={focused ? "blue" : "grey"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeNav" component={HomeNav} />
        <Stack.Screen name="Detail Of Books" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Splash = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem("@is_user_logged_in")
      .then((value) => {
        if (value !== null) {
          setTimeout(() => {
            navigation.replace("HomeNav");
          }, 3000);
        } else {
          navigation.replace("Login");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        flex: 1,
      }}
    >
      <StatusBar style="light" backgroundColor="#710000" />
      <Image
        source={viaTrading}
        style={{
          width: 200,
          height: 200,
          borderRadius: 200,
          marginBottom: 40,
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: "#E64848",
        }}
      >
        Welcome Here!
      </Text>

      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
          source={require("../../assets/splash.json")}
          autoPlay
          loop
          style={{
            marginTop: 190,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Nav;
