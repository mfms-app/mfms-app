import React from "react";
import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors"; // adjust path if needed

const ContentFrame = ({ imageSource, link }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (!link) return;

    // Detect external links
    if (link.startsWith("http://") || link.startsWith("https://")) {
      Linking.openURL(link);
    } else {
      // Internal navigation
      navigation.navigate(link);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.frame}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  frame: {
    width: 175,
    height: 215,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.blue,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ContentFrame;