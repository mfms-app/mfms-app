import React from "react";
import { View, StyleSheet } from "react-native"; // Removed FlatList, added View
import ContentFrame from "../components/ContenFrame.js";

export default function ContentGrid({ data }) {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          <ContentFrame 
            imageSource={item.image} 
            link={item.link} 
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    // These three lines recreate the "numColumns={2}" behavior:
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemWrapper: {
    // Setting width to ~48% ensures two items fit on one row with a gap
    width: "48%", 
    marginBottom: 16,
  },
});