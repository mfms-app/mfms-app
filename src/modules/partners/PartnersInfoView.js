import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function PartnerScreen({ isExtended, setIsExtended }) {
  const partners = [
    // { id: '1', name: 'Steve Madden', logo: require('../../../assets/images/partners/steve_madden.png') },
    { id: '2', name: 'Instyle', logo: require('../../../assets/images/partners/instyle.png') },
    { id: '3', name: 'Shopify', logo: require('../../../assets/images/partners/shopify.png') },
    { id: '4', name: 'Dairy Boy', logo: require('../../../assets/images/partners/dairy_boy.png')},
    { id: '47', name: 'Wolverine Worldwide', logo: require('../../../assets/images/partners/wolverine_worldwide.png')},
    { id: '48', name: 'Adobe', logo: require('../../../assets/images/partners/adobe.png')},
    { id: '5', name: 'LVMH', logo: require('../../../assets/images/partners/LVMH.png') },
    { id: '6', name: 'Louis Vuitton', logo: require('../../../assets/images/partners/louis_vuitton.png') },
    { id: '7', name: 'Dior', logo: require('../../../assets/images/partners/dior.png') },
    { id: '8', name: 'Tiffany & Co', logo: require('../../../assets/images/partners/tiffany&co.png') },
    { id: '10', name: 'Sweetgreen', logo: require('../../../assets/images/partners/sweetgreen.png') },
    { id: '11', name: 'Uniqlo', logo: require('../../../assets/images/partners/uniqlo-red.png') },
    { id: '12', name: 'Lands End', logo: require('../../../assets/images/partners/lands_end.png') },
    { id: '13', name: 'Tarte', logo: require('../../../assets/images/partners/tarte.png') },
    { id: '14', name: 'Lancome', logo: require('../../../assets/images/partners/lancome.png') },
    { id: '15', name: 'Loreal', logo: require('../../../assets/images/partners/loreal.png') },
    { id: '16', name: 'Skin Ella Rose', logo: require('../../../assets/images/partners/skinellarose.png') },
    { id: '17', name: 'Smart Sweets', logo: require('../../../assets/images/partners/smart-sweets.png') },
    // { id: '18', name: '818', logo: require('../../../assets/images/partners/818.png') },
    // { id: '19', name: 'Sprinter', logo: require('../../../assets/images/partners/sprinter.png') },
    { id: '20', name: 'Michgrads', logo: require('../../../assets/images/partners/michgrads.png') },
    { id: '21', name: 'Poppi', logo: require('../../../assets/images/partners/poppi.png') },
    { id: '22', name: 'Vegobears', logo: require('../../../assets/images/partners/vegobears.png') },
    { id: '23', name: 'Happy Coffee', logo: require('../../../assets/images/partners/happy.png') },
    { id: '24', name: 'Thrifted University', logo: require('../../../assets/images/partners/thrifted_university.png') },
    { id: '25', name: 'Simply Gum', logo: require('../../../assets/images/partners/simply.png') },
    { id: '26', name: 'Skinny Dipped', logo: require('../../../assets/images/partners/skinny-dipped.png') },
    { id: '27', name: 'Cinnaholic', logo: require('../../../assets/images/partners/cinnaholic.png') },
    { id: '28', name: 'Vivrelle', logo: require('../../../assets/images/partners/vivrelle.png') },
    { id: '29', name: 'Bivouac', logo: require('../../../assets/images/partners/bivouac.jpg') },
    { id: '30', name: 'Gracious MFG', logo: require('../../../assets/images/partners/gracious_mfg.png') },
    { id: '31', name: 'Intelligent Change', logo: require('../../../assets/images/partners/intelligent_change.png') },
    { id: '32', name: 'Sml Wld Coffee', logo: require('../../../assets/images/partners/sml-wrld.png') },
    { id: '33', name: 'Go Puff', logo: require('../../../assets/images/partners/gopuff.png') },
    { id: '34', name: 'Parlux', logo: require('../../../assets/images/partners/parlux.png') },
    { id: '35', name: 'Realsy', logo: require('../../../assets/images/partners/realsy.png') },
    { id: '36', name: 'Lovebird', logo: require('../../../assets/images/partners/lovebird.png') },
    { id: '37', name: 'Unwell', logo: require('../../../assets/images/partners/unwell.png') },
    { id: '38', name: 'Vacation', logo: require('../../../assets/images/partners/vacation.png') },
    { id: '39', name: 'Heaven Mayhem', logo: require('../../../assets/images/partners/heaven_mayhem.png') },
    { id: '40', name: 'Robs Popcorn', logo: require('../../../assets/images/partners/robs_popcorn.png') },
    { id: '41', name: 'Malk', logo: require('../../../assets/images/partners/malk.png') },
    { id: '42', name: 'Wildflower', logo: require('../../../assets/images/partners/wildflower.png') },
    { id: '43', name: 'Essie', logo: require('../../../assets/images/partners/essie.png') },
    { id: '44', name: 'Peachlab', logo: require('../../../assets/images/partners/peachlab2.png') },
    { id: '49', name: 'Earths Splendor', logo: require('../../../assets/images/partners/earths_splendor.png') },
    { id: '50', name: 'John Frieda', logo: require('../../../assets/images/partners/JohnFriedaLogo.png') },
    { id: '51', name: 'Biore', logo: require('../../../assets/images/partners/biore.png') },
    { id: '52', name: 'Color WOW', logo: require('../../../assets/images/partners/color_wow.png') },
    { id: '53', name: 'Pharmaceris', logo: require('../../../assets/images/partners/Pharmaceris.png') },
    { id: '54', name: 'Juice Plus', logo: require('../../../assets/images/partners/Juice_Plus.jpg') },
    { id: '55', name: 'Hello Sunday', logo: require('../../../assets/images/partners/hello_sunday.png') },
    { id: '46', name: 'SPARC', logo: require('../../../assets/images/partners/sparc.png') },
  ]

  return (
    
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >

<View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/transparent_black.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text size={10} black style={styles.header}> </Text>
          
        </View>
        
        <FlatList
          data={partners}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text size={25} black style={styles.header}>Presented by:</Text>
              <View style={styles.partnerItem}>
                <Image source={require('../../../assets/images/partners/steve_madden.png')} style={styles.partnerLogo} resizeMode="contain" />
              </View>
              <View style={styles.divider} />
              {/* <Text size={25} black style={styles.header}>Partners:</Text> */}
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.partnerItem}>
              <Image source={item.logo} style={styles.partnerLogo} resizeMode="contain" />
            </View>
          )}
        />

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  logo :{
    width: 50,
    height: 50,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  header: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontStyle: "italic",
    alignContent: 'center',
    color: colors.black
  },
  divider: {
    width: '150%', 
    height: 1, 
    backgroundColor: colors.black,  
  },
  headerContainer: {
    alignItems: 'center',
  },
  partnerList: {
    alignItems: 'center',
  },
  listContainer: {
    alignItems: 'center',
    paddingRight: 10,
    width: '100%'
  },
  partnerItem: {
    marginVertical: 15,
  },
  partnerLogo: {
    width: 200,
    height: 80,
  },
});
