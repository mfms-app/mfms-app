import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Animated, TouchableOpacity, Linking, Dimensions, Easing } from 'react-native';
import { fonts, colors } from '../../styles';
import { Image } from 'react-native';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const videoRef = useRef(null);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={require('../../../assets/videos/summit_sizzle_reel.mov')}
              style={styles.video}
              resizeMode="cover"
              repeat={true}
              paused={false}
              muted={true}
              playInBackground={false}
              playWhenInactive={true}
              onError={(error) => console.log('Video Error:', error)}
              onLoad={() => console.log('Video loaded successfully')}
              onReadyForDisplay={() => console.log('Video ready for display')}
            />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  videoContainer: {
    width: '115%',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 0,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 250, // More rectangular aspect ratio
    backgroundColor: '#000',
  },
  });