import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { normalize } from "../../fontsNormalisation";
import { deleteFavAnime, updateFavAnime } from "../../Api/users";
import { AuthContext } from "../../context/auth";
import { CachedImage } from "../";
import { Icon } from "../";

const getEngName = (namesStr) => {
  let nameArr = namesStr?.split(",");
  return nameArr?.find((name) => /^[a-zA-Z0-9"': ]+$/.test(name.trim()));
};

const VideoDetails = ({
  currentEpisode,
  setEpisode,
  videoDetails,
  movieId,
}) => {
  const {
    title,
    description,
    releaseDate,
    otherName: name,
    episodes,
    type,
    subOrDub,
    url,
    status,
    genres,
    image: thumbnail,
  } = videoDetails;
  const [isInFavAnime, setIsInFavAnime] = useState(false);
  const [data, setData] = useContext(AuthContext);
  useEffect(() => {
    let isFound =
      data.user.favouriteAnime.find((anime) => {
        return anime.movieId === movieId;
      }) || false;
    setIsInFavAnime(isFound);
  }, [movieId, data.user]);
  const onShare = () => {
    const message = `Hey, I'm watching ${
      getEngName(name) || title
    }, you would like it too! Watch it on AnimeX app. \n ${url}`;
    try {
      Share.share({ message });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const headersList = {
    Accept: "*/*",
    authorization: data.token,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    movieId: movieId,
    name: title,
    imgUrl: thumbnail,
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

  const toggleFavAnime = async () => {
    try {
      let response;
      if (isInFavAnime) {
        setIsInFavAnime(false);
        response = await deleteFavAnime({
          headers: headersList,
          data: bodyContent,
        });
      } else {
        setIsInFavAnime(true);
        response = await updateFavAnime({
          headers: headersList,
          data: bodyContent,
        });
      }
      updateLocalUser({ favouriteAnime: response.favouriteAnime });
    } catch (error) {
      // Handle error
      Alert.alert(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {title || getEngName(name)}
        {episodes?.length > 1 && ` Episodes ${currentEpisode?.number}`}
      </Text>
      <View style={styles.tagsContainer}>
        <Tag text={`Produced: ${releaseDate}`} bgColor={"lightpink"} />
        <Tag text={subOrDub?.toUpperCase()} />
        <Tag text={status?.toUpperCase()} bgColor={"lightgreen"} />
      </View>
      <View style={styles.btnWrapper}>
        {isInFavAnime ? (
          <Btn
            title={"Liked"}
            source={require("../../assets/icons/heart-fill.png")}
            onPress={toggleFavAnime}
          />
        ) : (
          <Btn
            title={"Like"}
            source={require("../../assets/icons/heart.png")}
            onPress={toggleFavAnime}
          />
        )}
        <Btn
          title="Share"
          source={require("../../assets/icons/share-square.png")}
          onPress={onShare}
          isActive={false}
        />
        <Btn
          title="Download"
          source={require("../../assets/icons/download.png")}
          onPress={() => {}}
          isActive={false}
        />
      </View>
      <View style={styles.descWrapper}>
        <Text style={styles.title}> Description</Text>
        <FormatedDesc description={description} />
      </View>
      <View style={styles.descWrapper}>
        <Text style={styles.title}> Genres</Text>
        <View style={{ ...styles.tagsContainer, flexWrap: "wrap", gap: 10 }}>
          {genres?.map((text) => (
            <Tag
              text={text}
              bgColor="transparent"
              color="#fff"
              style={{
                borderWidth: 1,
                borderColor: "#888",
                color: "#fff",
                padding: 6,
              }}
            />
          ))}
        </View>
      </View>
      {episodes?.length > 1 && (
        <View style={styles.episodeWrapper}>
          <Text style={styles.title}> Episodes</Text>
          {episodes?.map((episode, id) => {
            return (
              <EpisodeCard
                thumbnail={thumbnail}
                name={name}
                title={title}
                currentEpisode={currentEpisode}
                episode={episode}
                setEpisode={setEpisode}
                key={id}
              />
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

const Tag = ({ text, bgColor, style, color }) => (
  <View style={[styles.tags(bgColor), style]}>
    <Text style={{ ...styles.tagText, color }}>{text}</Text>
  </View>
);

const Btn = ({ title, source, onPress, isActive }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Icon source={source} size={25} color="#ccc" />
    <Text style={[styles.tagText, { color: !isActive ? "#777" : "#ffc0cb" }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const EpisodeCard = React.memo(
  ({
    name,
    title,
    thumbnail,
    episode: { id: movieId, number: episodeNumber },
    setEpisode,
    currentEpisode,
  }) => {

    const playEpisode = () => {
      if (currentEpisode.id !== movieId)
        setEpisode({ id: movieId, number: episodeNumber });
    };

    return (
      <TouchableOpacity style={styles.episodeCard} onPress={playEpisode}>
        <View style={styles.thumbnail}>
          <CachedImage
            source={{ uri: thumbnail }}
            style={{ height: "100%", width: "100%" }}
            resizeMode="stretch"
          />
          <Icon
            source={require("../../assets/icons/play.png")}
            size={normalize(30)}
            color={"#eee"}
            style={{ position: "absolute" }}
          />
        </View>
        <View style={styles.episodedetails}>
          <FormatedDesc
            description={`${episodeNumber}. Episode ${
              title || getEngName(name)
            }`}
            styles={{ ...styles.title, fontSize: normalize(15) }}
          />
          <Icon
            source={require("../../assets/icons/download.png")}
            size={normalize(25)}
            color={"#eee"}
          />
        </View>
      </TouchableOpacity>
    );
  }
);

const FormatedDesc = React.memo(({ description,styles }) => {
  const [descTextLen, setDescTextLen] = useState(420);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    let _descLen = showFullDesc ? description?.length : 420;
    setDescTextLen(_descLen);
  }, [showFullDesc]);

  return (
    <Text style={{ color: "#ffffff", paddingLeft: 10, ...styles }}>
      {description?.slice(0, descTextLen)}
      {description?.length > 420 && (
        <TouchableWithoutFeedback
          onPress={() => setShowFullDesc((prev) => !prev)}
        >
          <Text style={{ fontWeight: 800, color: "#ffffff" }}>
            {" "}
            ...{showFullDesc ? "show less" : "show more"}
          </Text>
        </TouchableWithoutFeedback>
      )}
    </Text>
  );
});

export default VideoDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingTop: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontSize: normalize(20),
    letterSpacing: 0.75,
    color: "#fff",
    lineHeight: 25,
    textAlign: "left",
  },
  details: {
    fontSize: normalize(17),
    paddingVertical: 8,
  },
  tags: (bgColor) => ({
    padding: 4,
    marginRight: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgColor ?? "#FE9F01",
    borderRadius: 3,
    overflow: "hidden",
  }),
  tagText: {
    fontSize: normalize(14),
    color: "#000",
    zIndex: 10,
  },
  btnWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  btn: {
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  stats: {
    fontSize: normalize(15),
    color: "#fff",
    paddingVertical: 5,
  },
  statsHighlight: {
    fontSize: normalize(16),
    color: "#fe9f01",
  },
  descWrapper: {
    width: "100%",
  },
  descText: {
    fontSize: normalize(15),
    color: "#fff",
    padding: 10,
    paddingVertical: 5,
    lineHeight: 23,
  },
  episodeWrapper: {
    width: "100%",
    paddingVertical: 10,
    height: "100%",
  },
  episodeCard: {
    width: "95%",
    height: 100,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  thumbnail: {
    backgroundColor: "grey",
    width: "20%",
    aspectRatio: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  episodedetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "80%",
    height: "100%",
  },
});
