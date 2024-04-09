import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { getOtp, verifyOtp } from "../auth";
import { AuthContext } from "../context/auth";
import { saveToAsyncStorage } from "../asyncStorage";
import { styles } from "../components/LoginComponents/styles";
import { PhoneInput, OtpInput } from "../components";
import { showToast } from "../utils";

const LoginScreen = () => {
  const [state, setState] = useContext(AuthContext);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    let res = await verifyOtp(number, otp);
    if (res.status == 200) {
      const data = JSON.parse(res.request._response).data;
      setState({ ...state, user: data.userObj, token: data.token });
      saveToAsyncStorage(data);
    } else {
      showToast("There was an error while verifing otp");
    }
    setIsLoading(false);
  };
  const [isOtpSent, setIsOtpSent] = useState(false);
  const handlePhoneSubmit = async () => {
    setIsLoading(true);
    let res = await getOtp(number);
    if (res.status == 200) {
      setIsOtpSent(true);
    } else {
      showToast("There was an error while sending otp");
    }
    setIsLoading(false);
  };

  const setDefaultUser = () => {
    setState({
      ...state,
      user: {
        id: "user_default",
        name: "user",
        email: "",
        phone: "",
        isSubscribed: false,
        favouriteAnime: [],
        watchList: [],
        profileImgUrl:
          "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
      },
      token: "default_user_token",
    });
  };
  const changeNumber = () => {
    setIsOtpSent(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash.png")}
        resizeMode="stretch"
        style={{ position: "absolute" }}
      />
      <TouchableOpacity style={styles.skipSection} onPress={setDefaultUser}>
        <Text style={[styles.msgtext, { fontSize: 18 }]}>Skip</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        behavior="padding"
      >
        <View style={styles.authWrapper}>
          {!isOtpSent ? (
            <PhoneInput
              number={number}
              setNumber={setNumber}
              handlePhoneSubmit={handlePhoneSubmit}
              isLoading={isLoading}
            />
          ) : (
            <OtpInput
              otp={otp}
              setOtp={setOtp}
              handleOtpSubmit={handleOtpSubmit}
              handlePhoneSubmit={handlePhoneSubmit}
              number={number}
              changeNumber={changeNumber}
              isLoading={isLoading}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
