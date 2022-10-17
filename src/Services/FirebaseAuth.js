import { firebase } from "../Services/FirebaseHelper";
import { saveUserSession } from "../Services/sessionHelper";
import { Alert } from "react-native";

/** When User sends Register Details*/

function attemptoRegisterNewUser(
  username,
  email,
  password,
  mobile,
  navigation
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const userId = response.user.uid;
      addUserDetailsBasedonUID(userId, username, email, mobile, navigation);
    })
    .catch((error) => {
      alert(error.message);
    });
}

/** When User Successfully authenticated save User Details on FireStore */

function addUserDetailsBasedonUID(uid, username, email, mobile, navigation) {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set({ username, email, mobile })
    .then(() => {
      Alert.alert("Hi Buddy!", "SuccessFully Registered");
      navigation.navigate("Login");
    })
    .catch((error) => {
      alert(error.message);
    });
}

export { attemptoRegisterNewUser };

/**This Function Allowing Users to signin from Firebase and Go to Home Page.*/

function attemptToSignIn(email, passcode, navigation) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, passcode)
    .then(() => {
      navigation.replace("HomeNav");
      Alert.alert("Welcome!", "Login SuccessFull");
      saveUserSession("true"); //this will save a variable called is_logged_in in storage
    })
    .catch((error) => {
      alert(error.message);
    });
}

export { attemptToSignIn };
