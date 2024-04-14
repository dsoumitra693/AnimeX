import { StyleSheet, View, Text } from "react-native";
import React from "react";
import FeedSection from "./FeedSection";
import { FEED_GENRES } from "../../constants";

const Feed = () => {
  return (
    <View style={styles.container}>
      {FEED_GENRES.map((genre, id) => (
        <FeedSection genre={genre} key={id} />
      ))}
      {/* <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      }}>
        <Text style={{
          color:"#999"
        }}>— — Nothing else — —</Text>
      </View> */}
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    paddingBottom: 10,
  },
});
