import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import viaTrading from "../../assets/images/viaTrading.png";
import viaTradingbg from "../../assets/images/viaTradingbg.jpg";

const NewPassword = ({ navigation }) => {
  return (
    <ImageBackground
      source={viaTradingbg}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#710000" />
        <View style={styles.logoCon}>
          <Image style={styles.logo} source={viaTrading}></Image>
        </View>

        <View style={styles.formCon}>
          <TextInput
            placeholder={"New Passcode"}
            secureTextEntry={true}
            style={styles.inputCon}
          />
          <TextInput
            placeholder={"Confirm Passcode"}
            secureTextEntry={true}
            style={styles.inputCon}
          />
          <View style={styles.btnCo}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.userBtn}
            >
              <View style={styles.buttonLogin}>
                <Text style={styles.btnText}>Set Password</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
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
  formCon: {
    width: "100%",
    height: "50%",
    padding: 20,
    justifyContent: "center",
  },
  inputCon: {
    borderWidth: 4,
    borderColor: "brown",
    marginVertical: 8,
    padding: 10,
    borderRadius: 40,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#F9F3EE",
  },
  text: {
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnCo: {
    width: 320,
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
  buttomtext: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NewPassword;
