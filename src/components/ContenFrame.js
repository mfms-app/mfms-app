import React from "react";
import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors"; // adjust path if needed

const ContentFrame = ({ imageSource, link }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (!link) return;
    if (link.startsWith("http://") || link.startsWith("https://")) {
      Linking.openURL(link);
    } else {
      navigation.navigate(link);
    }
  };

  return (
    // Outer View handles the shadow
    <View style={styles.shadowContainer}>
      <Pressable onPress={handlePress} style={styles.innerFrame}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    width: 175,
    height: 215,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android Shadow
    elevation: 5, 
    // Ensure the shadow isn't clipped by a parent container
    backgroundColor: 'transparent', 
  },
  innerFrame: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.blue,
    overflow: "hidden", // This clips the Image, but not the shadow
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ContentFrame;