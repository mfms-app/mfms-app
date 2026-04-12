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
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "../../styles";
import AppText from "../../components/Text";
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

      <AppText variant='body' style={styles.name}>
        {item.name}
      </AppText>
      <AppText variant='caption' style={styles.title}>
        {item.title}
      </AppText>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.header} onPress={toggle}>
        <AppText variant='h3' style={styles.headerText}>
          {title}
        </AppText>

        <Icon 
          name={open ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={colors.black}
          style={styles.arrow}
        />
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
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 0.1,
    borderColor: colors.darkGray + '20',
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  headerText: {
    color: colors.black,
    flex: 1,
  },

  arrow: {
    paddingLeft: 8,
  },

  arrowOpen: {
    transform: [{ rotate: "180deg" }],
  },

  content: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray + '30',
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
  },
  photo: {
    width: "100%",
    height: "140%",
    alignSelf: "flex-start",
  },
  name: {
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },

  title: {
    color: colors.black,
    textAlign: "center",
  },
});