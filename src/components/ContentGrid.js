import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ContentFrame from "../components/ContenFrame.js";

export default function ContentGrid({ data }) {

  const renderItem = ({ item }) => (
    <ContentFrame
      imageSource={item.image}
      link={item.link}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});