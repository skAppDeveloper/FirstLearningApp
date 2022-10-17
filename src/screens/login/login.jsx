import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import viaTrading from "../../../assets/images/viaTrading.png";
import viaTradingbg from "../../../assets/images/viaTradingbg.jpg";
import { attemptToSignIn } from "../../Services/FirebaseAuth";
import ButtonComp from "../../components/Button";
import Loaded from "../../components/Loader";
import { Entypo } from "@expo/vector-icons";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [securePasscode, setSecurePasscode] = useState(true);
  const [loading, setLoading] = useState();

  const onEyePressed = () => {
    setSecurePasscode(!securePasscode);
  };
  return (
    <>
      <ScrollView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ImageBackground
          source={viaTradingbg}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#710000" />
            <View style={styles.logoCon}>
              <Image style={styles.logo} source={viaTrading}></Image>
            </View>

            <View style={styles.icon}>
              <Entypo name="email" size={24} color="black" />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={"Email"}
                onChangeText={(text) => setEmail(text)}
                style={{ marginLeft: 10 }}
              />
            </View>
            <View style={styles.icon}>
              <Entypo
                name={securePasscode ? "eye-with-line" : "eye"}
                size={24}
                color="black"
                onPress={onEyePressed}
              />
              <TextInput
                value={passcode}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={"Passcode"}
                secureTextEntry={securePasscode}
                onChangeText={(text) => setPasscode(text)}
                style={{ marginLeft: 10 }}
              />
            </View>
            <View
              style={{
                width: "40%",
                height: "5%",
                alignItems: "flex-end",
                marginRight: 10,
                marginTop: 40,
                marginBottom: 10,
                borderRadius: 25,

                alignSelf: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Password")}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#FF0063",
                    fontSize: 16,
                    fontWeight: "bold",
                    margin: 4,
                  }}
                >
                  Forget Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnCo}>
              <ButtonComp
                title={"Login"}
                onPress={() => {
                  setLoading(true);
                  attemptToSignIn(email, passcode, navigation);
                }}
                disabled={email === "" || passcode === "" ? true : false}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <View style={styles.buttomtext}>
                <Text
                  style={{
                    color: "#FF0063",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Don't have An Acoount SignUp Here!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
      {loading ? <Loaded /> : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 640,
  },
  logoCon: {
    marginTop: 50,
    width: "100%",
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 190,
    height: 190,
    borderRadius: 100,
    resizeMode: "center",
  },

  text: {
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnCo: {
    justifyContent: "center",
    alignItems: "center",
  },
  userBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonLogin: {
    backgroundColor: "#E64848",
    width: 200,
    height: 40,
    padding: 10,
    borderRadius: 40,
    marginTop: 10,
  },
  disabledLogin: {
    backgroundColor: "grey",
    width: 200,
    height: 40,
    padding: 10,
    borderRadius: 40,
    marginTop: 10,
  },
  buttomtext: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "grey",
    width: 200,
    height: 40,
    padding: 10,
    borderRadius: 40,
    marginTop: 10,
  },
  icon: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("screen").width - 20,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 4,
    borderColor: "brown",
    marginVertical: -30,
    padding: 12,
    backgroundColor: "#F9F3EE",
    margin: 10,
  },
});
export default Login;
