import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Dimensions,
  Easing,
  Linking,
} from 'react-native';
import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';

const images = [
  { id: '1', source: require('../../../assets/images/ffs/ffs1.png')},
  { id: '2', source: require('../../../assets/images/ffs/ffs2.png') },
  { id: '3', source: require('../../../assets/images/ffs/ffs3.png') },
  { id: '4', source: require('../../../assets/images/ffs/ffs4.png') },
  { id: '5', source: require('../../../assets/images/ffs/ffs5.png') },
  { id: '6', source: require('../../../assets/images/ffs/ffs6.png') },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

// TODO: Replace finalists
const finalists = [
  { id: '1', name: 'Adelina Akhmetshina', source: require('../../../assets/images/ffs/Adelina.jpg')},
  { id: '2', name: 'Eden Meidl', source: require('../../../assets/images/ffs/Eden.jpg') },
  { id: '3', name: 'Madeline Incammicia', source: require('../../../assets/images/ffs/Madeline.jpg')},
  { id: '4', name: 'Miles Watkins', source: require('../../../assets/images/ffs/Miles.jpg') },
  { id: '5', name: 'Preston Ross', source: require('../../../assets/images/ffs/Preston.jpg') },
  { id: '6', name: 'Rachel Goldstein', source: require('../../../assets/images/ffs/Rachel_Goldstein.png') },
]

export default function FFSScreen({ isExtended, setIsExtended }) {
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const [currentFinalistIndex, setCurrentFinalistIndex] = useState(0);
  const finalistFadeAnim = useRef(new Animated.Value(1)).current;
  
  const navigateCarousel = (direction) => {
    const nextIndex = direction === 'next'
    ? (currentFinalistIndex === finalists.length - 1 ? 0 : currentFinalistIndex + 1)
    : (currentFinalistIndex === 0 ? finalists.length - 1 : currentFinalistIndex - 1);

    // Fade out current finalist
    Animated.timing(finalistFadeAnim, {
      toValue: 0,
      duration: 200, // Slightly faster fade-out
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic), // Add easing function
    }).start(() => {
      // Update the index after fade out is complete
      setCurrentFinalistIndex(nextIndex);
      
      // Small delay before fade-in to ensure state update is processed
      setTimeout(() => {
        // Fade in new finalist
        Animated.timing(finalistFadeAnim, {
          toValue: 1,
          duration: 250, // Slightly longer fade-in
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic), // Add easing function
        }).start();
      }, 50); // Small delay
    });
  };

  useEffect(() => {
    const animateStream = (animation) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: -SCREEN_WIDTH * 50,
            duration: 999999,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ])
      ).start();
    };
  
    animateStream(slideAnim1);
  }, [slideAnim1]);  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}>
      <View style={styles.textContainer}>
      <AppText style={styles.text} variant='h1'>Fashion Forward Showcase</AppText>
      <View style={styles.divider} />
      <AppText style={styles.text} variant='body'>Presented by Steve Madden</AppText>
      <Image source={require('../../../assets/images/ffs_logo.png')} style={styles.logo} />
      <AppText style={styles.text} variant='body'>The MFMS Fashion Forward Showcase highlights college students at the University of Michigan and nationwide who are innovating in fashion and media—whether by building brands, creating content, or growing a media presence. </AppText>
      </View>

      {/* Finalists */}
      <View style={styles.finalistContainer}>
      <AppText style={styles.text} variant='h2'>2026 Finalists</AppText>
          {/* New Carousel UI */}
    <View style={styles.carouselContainer}>
        {/* Left navigation button */}
        <TouchableOpacity 
          style={styles.carouselNavButton} 
          onPress={() => navigateCarousel('prev')}
        >
          <Icon name="chevron-left" size={24} color={colors.black} />
        </TouchableOpacity>
        
        {/* Finalist display */}
        <Animated.View style={[
          styles.carouselItem,
          { opacity: finalistFadeAnim }
        ]}>
          <Image 
            source={finalists[currentFinalistIndex].source} 
            style={styles.carouselImage} 
          />
          <Text style={styles.carouselName}>
            {finalists[currentFinalistIndex].name}
          </Text>
        </Animated.View>
        
        {/* Right navigation button */}
        <TouchableOpacity 
          style={styles.carouselNavButton}
          onPress={() => navigateCarousel('next')}
        >
          <Icon name="chevron-right" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      
      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {finalists.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              index === currentFinalistIndex && styles.activeDot
            ]} 
          />
        ))}
      </View>
      
      <View style={styles.button}>
      <RNSButton
        caption="Learn More"
        bordered
        primary
        onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com/fashion-forward-showcase')}
      />
      </View>
      </View>
    <View style={styles.textContainer}>
    <AppText style={styles.text} variant='body'>The finalists will present at the Michigan Fashion Media Summit before industry leaders, with one winner receiving an exclusive professional development opportunity. The showcase offers student creatives a major platform for exposure, networking, and career advancement.</AppText>
    </View>
      <FlatList
      nestedScrollEnabled={true}
      scrollEnabled={false}
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={item.source} style={styles.image} />
        </View>
      )}
      contentContainerStyle={styles.gallery}
    />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  flexGrow: {
    flex: 1,
    backgroundColor: colors.white
  },
  text:{
    textAlign: 'center',
  },
  textContainer:{
    paddingHorizontal: 20,
    gap: 10,
  },
  finalistContainer:{
    gap: 10,
    marginTop: 40,
  },
  divider: {
    width: '90%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
  },
  logo :{
    width: 350,
    height: 200,
    alignSelf: 'center',
  },
  button:{
    alignSelf: 'center',
    marginBottom: 40,
  },
  gallery:{
    alignSelf: 'center',
    marginTop: 40
  },
  imageContainer:{
    alignContent:'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40, 
  },
  carouselContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  carouselNavButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.white,
    // borderRadius: 20,
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 2,
  },
  carouselItem: {
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.6,
  },
  carouselImage: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: 12,
    marginBottom: 15,
  },
  carouselName: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 22,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.blue,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
