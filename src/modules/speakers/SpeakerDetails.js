import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles';

const SpeakerDetails = ({ route }) => {
  const navigation = useNavigation();
  const { speaker } = route.params; // Get speaker data

  return (
    <ScrollView style={styles.container}>
      {/* Speaker Details */}
      <View style={styles.imageContainer}>
        <Image
          source={speaker.image}
          style={styles.image}
          resizeMode='contain' // Ensures the image is cropped from the bottom
        />
      </View>
      <Text style={styles.name}>{speaker.name}</Text>
      <Text style={styles.title}>{speaker.title}</Text>
      <Text style={styles.title}></Text>      
      {speaker.description.split("\n").map((line, index) => (
        <Text style={styles.description} key={index}>{line}{"\n"}</Text>
      ))}
      <Text style={styles.title}>{"\n"}</Text>      
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: '85%',
    height: undefined,
    aspectRatio: 3 / 4,
    overflow: 'hidden', // Crop the bottom of the image
    marginBottom: 20,
    alignItems: 'center', // Horizontally center the image
    justifyContent: 'center', // Vertically center the image
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%', 
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "NeueHaasDisplayRoman",
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    color: colors.blue,
    fontFamily: "Arial"
  },
  description: {
    fontSize: 17,
    fontFamily: "NeueHaasDisplayRoman",
    lineHeight: 22,
    color: colors.gray || '#555',
    // marginBottom: 20,
  },
});

export default SpeakerDetails;
