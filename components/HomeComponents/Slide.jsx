import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../fontsNormalisation";
import { deleteWatchList, updateWatchList } from "../../Api/users";
import { AuthContext } from "../../context/auth";
import CachedImage from "../CachedImage";

const { width, height } = Dimensions.get("window");

const Slide = ({ src, title, type, movieId }) => {
  const navigator = useNavigation();
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [data, setData] = useContext(AuthContext);

  const headersList = {
    Accept: "*/*",
    authorization: data.token,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    movieId: movieId,
    name: title,
    imgUrl: src,
  });

  const updateLocalUser = useCallback(
    (props) => {
      setData((prevData) => ({
        ...prevData,
        user: { ...prevData.user, ...props },
      }));
    },
    [setData]
  );

  const addToWatchList = useCallback(async () => {
    setIsInWatchList(true);
    try {
      const response = await updateWatchList({
        headers: headersList,
        data: bodyContent,
      });
      updateLocalUser({ watchList: response.watchList });
    } catch (error) {
      showToast("Something went wrong");
    }
  }, [headersList, bodyContent, updateLocalUser]);

  const removeFromWatchList = useCallback(async () => {
    setIsInWatchList(false);
    try {
      const response = await deleteWatchList({
        headers: headersList,
        data: bodyContent,
      });
      updateLocalUser({ watchList: response.watchList });
    } catch (error) {
      showToast("Something went wrong");
    }
  }, [headersList, bodyContent, updateLocalUser]);

  useEffect(() => {
    let isFound =
      data?.user?.watchList?.find((movie) => movie.movieId === movieId) ||
      false;
    setIsInWatchList(isFound);
  }, [movieId, data]);

  const playNow = useCallback(() => {
    navigator.navigate("Player", { movieId: movieId });
  }, [movieId, navigator, src]);

  return (
    <View
      style={{
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <CachedImage
        source={{ uri: src }}
        height={height*1.05}
        width={width}
        resizeMode="stretch"
      />
      <View style={styles.container}>
        <LinearGradient
          colors={["transparent", "#222"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.9 }}
          style={styles.linearGradient}
        >
          <View style={styles.textWrapper}>
            <Text style={styles.geners}>{type}</Text>
            <Text style={styles.title}> {title.slice(0, 15)} </Text>
          </View>
          <View style={styles.btnWrapper}>
            {!isInWatchList ? (
              <Button
                iconName="plus"
                title="My List"
                onPress={addToWatchList}
              />
            ) : (
              <Button
                iconName="check"
                title="My List"
                textColor={"#fff"}
                style={{ backgroundColor: "green" }}
                onPress={removeFromWatchList}
              />
            )}
            <Button
              iconName="play"
              title="Watch Now"
              style={{ width: 160, backgroundColor: "#FE9F01" }}
              onPress={playNow}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Slide;

const Button = ({ iconName, title, style, onPress, textColor }) => (
  <TouchableOpacity style={{ ...styles.btn, ...style }} onPress={onPress}>
    <Feather name={iconName} size={30} color={textColor} />
    <Text
      style={{
        fontSize: normalize(16),
        padding: 4,
        color: textColor,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: 200,
    left: 0,
    width: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  textWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: normalize(35),
    textAlign: "center",
    fontWeight: "100",
    color: "#fff",
  },
  geners: {
    fontSize: normalize(16),
    fontWeight: "400",
    marginBottom: 5,
    color: "#fff",
  },
  btnWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 180,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "#DDDCDD",
    borderRadius: 10,
    elevation: 3,
    color: "#222",
  },
});
