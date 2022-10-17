import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import viaTradingbg from "../../../assets/images/viaTradingbg.jpg";
import viaTrading from "../../../assets/images/viaTrading.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { attemptoRegisterNewUser } from "../../Services/FirebaseAuth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Enter Your Full Name!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter Your Email!"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .required("Please Enter Your Password!")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Must Contain 8 character including numbers, upper/lower special characters"
    ),
  confirmPassword: Yup.string()
    .min(8, "Confirm Passcode must be 8 characters long")
    .oneOf([Yup.ref("password")], "Your Passcode do not match!")
    .required("Confirm Passcode is required!"),
  mobile: Yup.string()
    .min(11, "Must be Exactly 11 digits!")
    .max(11, "Must be Exactly 11 digits!")
    .required("Please Enter Your Mobile No...!")
    .matches(/^[0-9]+$/, "Must be only digits!"),
});

const Register = ({ navigation }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        navigation,
      }}
      validationSchema={SignupSchema}
      onSubmit={({ username, email, password, mobile, navigation }) => {
        attemptoRegisterNewUser(username, email, password, mobile, navigation);
      }}
    >
      {({
        values,
        isValid,
        errors,
        handleChange,
        touched,
        handleSubmit,
        handleBlur,
      }) => (
        <ScrollView style={{ flex: 2, paddingTop: StatusBar.currentHeight }}>
          <ImageBackground
            source={viaTradingbg}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.logoCon}>
              <Image style={styles.logo} source={viaTrading}></Image>
            </View>
            <View style={styles.formContainer}>
              <StatusBar style="light" backgroundColor="#710000" />

              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Full Name"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  style={styles.inputStyle}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorTxt}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={styles.inputStyle}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorTxt}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  //secureTextEntry={securePasscode}
                  style={styles.inputStyle}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorTxt}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  //secureTextEntry={securePasscode}
                  style={styles.inputStyle}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="phone-pad"
                  placeholder="Mobile No"
                  value={values.mobile}
                  onChangeText={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  style={styles.inputStyle}
                />
                {touched.mobile && errors.mobile && (
                  <Text style={styles.errorTxt}>{errors.mobile}</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[
                  styles.userBtn,
                  { backgroundColor: isValid ? "#E64848" : "grey" },
                ]}
                disabled={!isValid}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  SignUp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <View style={styles.buttomtext}>
                  <Text
                    style={{
                      color: "#FF0063",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Have an Account Login Here!
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    borderRadius: 20,
    width: "100%",
  },

  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    backgroundColor: "#F9F3EE",
    borderColor: "brown",
    borderWidth: 4,
    padding: 10,
    borderRadius: 25,
  },
  errorTxt: {
    fontSize: 12,
    color: "#FF0D10",
  },
  container: {
    width: 360,
    height: 640,
    marginTop: -10,
  },
  logoCon: {
    width: "40%",
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100,
    resizeMode: "center",
  },
  userBtn: {
    marginTop: 0,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 20,
  },
  buttomtext: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
});
