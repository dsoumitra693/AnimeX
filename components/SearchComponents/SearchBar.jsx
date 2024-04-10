import { StyleSheet, View } from "react-native";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native";
import { normalize } from "../../fontsNormalisation";
import { Icon } from "../";
const SearchBar = ({ setSearchText, searchText }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        showSoftInputOnFocus
        placeholder="Search Here..."
        placeholderTextColor={"#888"}
        style={styles.textInput}
        value={searchText}
        onChangeText={(txt) => setSearchText(txt)}
        cursorColor={"#FE9F01"}
        keyboardAppearance="dark"
        returnKeyType="search"
      />
      <TouchableOpacity onPress={() => setSearchText("")}>
        <Icon
          source={require("../../assets/icons/cross-small.png")}
          size={35}
          color={searchText == "" ? "#888" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    padding: 10,
    margin: 15,
    top: StatusBar.currentHeight + 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#333",
    borderWidth: 2,
    justifyContent: "space-between",
    zIndex: 10,
    backgroundColor: "#222",
  },
  textInput: {
    fontSize: normalize(16),
    fontWeight: "600",
    color: "#fff",
    width: "80%",
  },
});
