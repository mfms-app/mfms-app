import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { colors } from '../../styles';
import Video from 'react-native-video';
import AppText from '../../components/Text.js';
import ContentGrid from '../../components/ContentGrid.js';

const homeContent = [
  {
    id: 1,
    image: require('../../../assets/images/recent/mfms2026.png'),
    link: 'Summit'
  },
  {
    id: 2,
    image: require('../../../assets/images/recent/stitch_one.png'),
    link: 'https://www.michiganfashionmediasummit.com/stitch-all/2026/3/10/style-vs-clothes'
  },
  {
    id: 3,
    image: require('../../../assets/images/recent/stitch_two.png'),
    link: 'https://www.michiganfashionmediasummit.com/stitch-all/2025/11/23/brendan-1'
  },
  {
    id: 4,
    image: require('../../../assets/images/recent/the_loop.png'),
    link: 'https://www.michiganfashionmediasummit.com/the-loop-post/2025/1/28/template-js53f'
  },
]
export default function HomeScreen() {
  const videoRef = useRef(null);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
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
              playWhenInactive={false}
              onError={(error) => console.log('Video Error:', error)}
              onLoad={() => console.log('Video loaded successfully')}
              onReadyForDisplay={() => console.log('Video ready for display')}
            />
        </View>
        <AppText variant="h2" style={styles.headerTitle}>
          Michigan Fashion Media Summit
        </AppText>
        <ContentGrid data={homeContent}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  headerTitle: {
    textAlign: 'center',
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