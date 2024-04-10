import { StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
const Icon = ({ source, size = 30, color="#fff", style }) => {
  return (
    <View style={{ ...styles.container, height: size, ...style}}>
      <Image
        style={{ ...styles.image, tintColor: color }}
        source={source}
        contentFit="cover"
      />
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
