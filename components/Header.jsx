import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { defaultProfileImg } from "../constants";
import { Avatar, Icon } from "./";
import { useNavigation } from "@react-navigation/native";
import { deleteFromAsyncStorage } from "../asyncStorage";
import { AuthContext } from "../context/auth";


const Header = ({ route }) => {
  const navigation = useNavigation();
  let [state, setState] = useContext(AuthContext);

  const logOut = async () => {
    await deleteFromAsyncStorage();
    setState(undefined);
  };

  const goToProfilePage = async () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      {route.name != "Home" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            source={require("../assets/icons/arrow-small-left.png")}
            size={35}
            color="#ccc"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Icon source={require("../assets/icons/search.png")} color="#222" />
        </TouchableOpacity>
      )}
      <View style={styles.leftContainer}>
        {/* <Feather
          name="cast"
          size={FONT.base}
          color={COLORS.white}
          onPress={logOut}
        /> */}
        <Avatar
          source={{
            uri: state?.user?.profileImgUrl || defaultProfileImg,
          }}
          size={25}
          onPress={goToProfilePage}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    borderColor: "#0000001a",
    borderBottomWidth: 1.5,
    overflow: "hidden",
    shadowColor: "#0000001a",
    shadowRadius: 10,
    shadowOpacity: 1,
    top: StatusBar.currentHeight - 15,
  },
  leftContainer: {
    height: 40,
    width: "20%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    elevation: 10,
  },
});
