import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';

import { colors } from '../../styles';
import AppText from '../../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactViewScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <AppText variant="h1">Contact Us</AppText>
        <View style={styles.divider} />
        <AppText variant="body" style={styles.text}>Please don't hesitate to reach out to us with any questions or feedback! Whether you're interested in partnering with us, have a media inquiry, or just want to say hello, we'd love to hear from you!</AppText>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.squareCard}
            onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com/')}
          >
            <Image 
              source={require('../../../assets/images/primarylogo.png')} 
              style={styles.icon} 
            />
            <AppText variant="caption" style={{ marginTop: 8 }}>
              Visit our website
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.squareCard}
            onPress={() => Linking.openURL('mailto:mfms-information@umich.edu')}
          >
            <Image 
              source={require('../../../assets/images/newsletter.png')} 
              style={styles.icon}
            />
            <AppText variant="caption" style={{ marginTop: 8 }}>
              Email us
            </AppText>
          </TouchableOpacity>
        </View>
        <AppText variant="h4">Follow us on Social Media!</AppText>
        <View style={styles.rectangleCardContainer}>
          <View style={styles.rectangleCard}>
            <TouchableOpacity 
              onPress={() => Linking.openURL('https://www.instagram.com/the_mfms/?hl=en')}
              style={styles.rectangleCardContent}
            >
              <Icon name="instagram" size={50} color={colors.black} style={styles.socialIcon} />
              <AppText variant="body">
                @the_mfms on Instagram
              </AppText>
            </TouchableOpacity>
            </View>
            <View style={styles.rectangleCard}>
            <TouchableOpacity 
              onPress={() => Linking.openURL('https://www.tiktok.com/@the_mfms')}
              style={styles.rectangleCardContent}
            >
              <Image 
              source={require('../../../assets/images/tik-tok.png')} 
              style={{ width: 50, height: 50 }} 
              />
              <AppText variant="body">
                @the_mfms on TikTok
              </AppText>
            </TouchableOpacity>
            </View>
            <View style={styles.rectangleCard}>
            <TouchableOpacity 
              onPress={() => Linking.openURL('https://open.spotify.com/show/665Wz5hi6qUmcqJxits75m?si=d7451dda455e43d9')}
              style={styles.rectangleCardContent}
            >
              <Icon name="spotify" size={50} color={colors.black} style={styles.socialIcon} />
              <AppText variant="body">
                Listen to our podcast on Spotify!
              </AppText>
            </TouchableOpacity>
            </View>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    alignItems: 'center', // Keep it centered horizontally
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
  text: {
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  squareCard: {
    height: 170,
    width: 170,
    backgroundColor: colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOpacity: 0.3,  // Slightly increased opacity
    shadowRadius: 4,     // Increased blur radius
    elevation: 6,        
    // Add these properties to ensure shadow on all sides
    shadowSpread: 10,     // Spread the shadow slightly
    borderWidth: 0.1,    // Extremely thin border can help define edges
    borderColor: colors.darkGray + '20', 
  },
  rectangleCard: {
    height: 70,
    width: '88%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    shadowOpacity: 0.3,  // Slightly increased opacity
    shadowRadius: 4,     // Increased blur radius
    elevation: 6,        
    // Add these properties to ensure shadow on all sides
    shadowSpread: 10,     // Spread the shadow slightly
    borderWidth: 0.1,    // Extremely thin border can help define edges
    borderColor: colors.darkGray + '20', 
  },
  rectangleCardContent:{
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '90%',
  },
  rectangleCardContainer: {
    gap: 16,
    marginVertical: 20,
  },
  icon: {
    width: 60, 
    height: 50,
    resizeMode: 'stretch'
  },
});
