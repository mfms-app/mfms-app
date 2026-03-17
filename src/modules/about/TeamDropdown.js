import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Linking,
} from "react-native";
import { colors } from "../../styles";
import border from "victory-native/lib/components/victory-primitives/border";

export default function TeamDropdown({ title, team }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const renderMember = ({ item }) => (
    <Pressable
      style={styles.member}
      onPress={() => item.link && Linking.openURL(item.link)}
    >
      <View style={styles.photoContainer}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.header} onPress={toggle}>
        <Text style={styles.headerText}>{title}</Text>

        <Text style={[styles.arrow, open && styles.arrowOpen]}>
          ▼
        </Text>
      </Pressable>

      {/* Content */}
      {open && (
        <View style={styles.content}>
          <FlatList
            data={team.members}
            keyExtractor={(item) => item.name}
            renderItem={renderMember}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: colors.blue,
    borderWidth: 2,
    borderRadius: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },

  arrow: {
    fontSize: 20,
  },

  arrowOpen: {
    transform: [{ rotate: "180deg" }],
  },

  content: {
    backgroundColor: colors.white,
    padding: 20,
  },

  member: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
  },
  photoContainer: {
    width: "100%",
    aspectRatio: 1 / 1.2,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    borderColor: colors.blue,
    borderWidth: 2,
    },
  photo: {
    width: "100%",
    height: "140%",      // make image taller than container
    alignSelf: "flex-start", // anchor image to the top
},
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
    textAlign: "center",
},

  title: {
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
  },
});