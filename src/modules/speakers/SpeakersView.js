import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../styles';
import { speakers } from './SpeakerData'; // Import speaker data
// sort speakers by name
speakers.sort((a, b) => {
  const firstNameA = a.name.split(' ')[0];
  const firstNameB = b.name.split(' ')[0];
  return firstNameA.localeCompare(firstNameB);
});

const SpeakersScreen = () => {
  const navigation = useNavigation();
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speakers</Text>
      <View style={styles.divider} />        
      
      <Text style={styles.subtitle}>Click on our speakers to learn more.</Text>

      {/* Speaker Grid */}
      <FlatList
        data={speakers}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.speakerContainer}
            onPress={() => navigation.navigate('SpeakerDetails', { speaker: item })}
            activeOpacity={1.0} // This prevents the opacity change when pressed

          >
            <View style={{ width: 150, height: 200, overflow: 'hidden' }}>
        <Image 
          source={item.image} 
          style={{ 
            width: '100%', 
            height: 200,  // Make it taller to crop the bottom
            alignSelf: 'center',  // Centers image horizontally
            position: 'relative', // Ensure the image is positioned normally
            resizeMode: 'cover',
            alignSelf: 'center',
            // //top: '20%' // Moves the image upwards, cropping the bottom
          }} 
          resizeMode="cover" // Crops from the bottom
        />
      </View>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 25,
  },
  title:{
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: 20,
  },
  divider: {
    width: '50%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginBottom: 20, 
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: "NeueHaasDisplayRoman"
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  speakerContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray,
    marginTop: 10,
    fontFamily: "NeueHaasDisplayRoman",
  },
});

export default SpeakersScreen;