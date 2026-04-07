import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Dimensions
} from 'react-native';

import {colors } from '../../styles';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns - 20;

const presentingPartner = {
  id: '1',
  name: 'Steve Madden',
  logo: require('../../../assets/images/partners/stevemadden_logo.png'),
  link: 'https://www.stevemadden.com/'
};

const partners = [
  {
    name: 'Saint James',
    logo: require('../../../assets/images/partners/saintjames_logo.png'),
    link: 'https://saintjamesicedtea.com/'
  },
  {
    name: 'Adobe',
    logo: require('../../../assets/images/partners/adobe_logo.png'),
    link: 'https://www.adobe.com'
  },
  {
    name: 'Balenciaga',
    logo: require('../../../assets/images/partners/balenciaga_logo.png'),
    link: 'https://www.balenciaga.com'
  },
  {
    name: 'Bloomingdales',
    logo: require('../../../assets/images/partners/bloomingdales_logo.png'),
    link: 'https://www.bloomingdales.com'
  },
  {
    name: 'Catalyst Brands',
    logo: require('../../../assets/images/partners/catalystbrands_logo.png'),
    link: 'https://catalystbrands.com'
  },
  {
    name: 'Danielle & Alix',
    logo: require('../../../assets/images/partners/danielle&alix_logo.png'),
    link: 'https://www.danielleandalix.com'
  },
  {
    name: 'Nike',
    logo: require('../../../assets/images/partners/nike_logo.png'),
    link: 'https://www.nike.com'
  },
  {
    name: 'Shopbop',
    logo: require('../../../assets/images/partners/shopbop_logo.png'),
    link: 'https://www.shopbop.com'
  },
  {
    name: 'WME',
    logo: require('../../../assets/images/partners/wme_logo.png'),
    link: 'https://www.wmeagency.com'
  },
  {
    name: 'Loft',
    logo: require('../../../assets/images/partners/loft_logo.png'),
    link: 'https://www.loft.com'
  },
  {
    name: 'Alice',
    logo: require('../../../assets/images/partners/alice_logo.png'),
    link: 'https://www.alicemushrooms.com'
  },
  {
    name: 'Arrae',
    logo: require('../../../assets/images/partners/arrae_logo.png'),
    link: 'https://www.arrae.com'
  },
  {
    name: 'AshleyGold',
    logo: require('../../../assets/images/partners/ashleygold_logo.png'),
    link: 'https://ashleygold.com'
  },
  {
    name: 'Bloom Nutrition',
    logo: require('../../../assets/images/partners/bloomnutrition_logo.png'),
    link: 'https://bloomnu.com'
  },
  {
    name: 'Bombas',
    logo: require('../../../assets/images/partners/bombas_logo.png'),
    link: 'https://bombas.com'
  },
  {
    name: 'BonBonBon',
    logo: require('../../../assets/images/partners/bbb_logo.png'),
    link: 'https://bonbonbon.com'
  },
  {
    name: 'UF1',
    logo: require('../../../assets/images/partners/uf1_logo.png'),
    link: 'https://www.corecollectivea2.com/'
  },
  {
    name: 'Dagne Dover',
    logo: require('../../../assets/images/partners/dagnedover_logo.png'),
    link: 'https://www.dagnedover.com'
  },
  {
    name: 'Double Soul',
    logo: require('../../../assets/images/partners/doublesoul_logo.png'),
    link: 'https://doublesoul.co'
  },
  {
    name: '818',
    logo: require('../../../assets/images/partners/818_logo.png'),
    link: 'https://drink818.com'
  },
  {
    name: 'Haus Labs',
    logo: require('../../../assets/images/partners/hauslabs_logo.png'),
    link: 'https://www.hauslabs.com'
  },
  {
    name: 'Intelligent Change',
    logo: require('../../../assets/images/partners/intelligentchange_logo.png'),
    link: 'https://www.intelligentchange.com'
  },
  {
    name: 'Khloud',
    logo: require('../../../assets/images/partners/khloud_logo.png'),
    link: 'https://khloudfoods.com'
  },
  {
    name: 'LOreal',
    logo: require('../../../assets/images/partners/loreal_logo.png'),
    link: 'https://www.loreal.com'
  },
  {
    name: 'Lands End',
    logo: require('../../../assets/images/partners/landsend_logo.png'),
    link: 'https://www.landsend.com'
  },
  {
    name: 'Lovebird',
    logo: require('../../../assets/images/partners/lovebird_logo.png'),
    link: 'https://lovebirdfoods.com'
  },
  {
    name: 'Neuro Gum',
    logo: require('../../../assets/images/partners/neurogum_logo.png'),
    link: 'https://neurogum.com'
  },
  {
    name: 'Odele',
    logo: require('../../../assets/images/partners/odele_logo.png'),
    link: 'https://odelebeauty.com'
  },
  {
    name: 'Parke',
    logo: require('../../../assets/images/partners/parke_logo.png'),
    link: 'https://shopparke.com'
  },
  {
    name: 'Parlux',
    logo: require('../../../assets/images/partners/parlux_logo.png'),
    link: 'https://www.parlux.com'
  },
  {
    name: 'Poppi',
    logo: require('../../../assets/images/partners/poppi_logo.png'),
    link: 'https://www.drinkpoppi.com'
  },
  {
    name: 'Roos Roast',
    logo: require('../../../assets/images/partners/roosroast_logo.png'),
    link: 'https://www.roosroast.com'
  },
  {
    name: 'Tarte',
    logo: require('../../../assets/images/partners/tarte_logo.png'),
    link: 'https://tartecosmetics.com'
  },
  {
    name: 'Touchland',
    logo: require('../../../assets/images/partners/touchland_logo.png'),
    link: 'https://touchland.com'
  },
  {
    name: 'Vegobears',
    logo: require('../../../assets/images/partners/vegobears_logo.png'),
    link: 'https://vegobears.com'
  },
  {
    name: 'SoulCycle',
    logo: require('../../../assets/images/partners/soulcycle_logo.png'),
    link: 'https://www.soul-cycle.com'
  },
  {
    name: 'Bivouac',
    logo: require('../../../assets/images/partners/bivouac_logo.png'),
    link: 'https://www.bivouacannarbor.com'
  },
  {
    name: 'Vivrelle',
    logo: require('../../../assets/images/partners/vivrelle_logo.png'),
    link: 'https://www.vivrelle.com'
  }
];

const PartnerCollage = () => {
  const handlePress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => handlePress(item.link)}
    >
      <Image 
        source={item.logo} 
        style={styles.logo} 
        resizeMode="contain" 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={partners}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

export default function PartnerScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}> 
    <ScrollView 
    contentContainerStyle={styles.scrollView}
    showsVerticalScrollIndicator={false}> 
       {/* Header Section */}
         <AppText style={styles.text} variant='h1'>Partners</AppText>
         <View style={styles.divider} />
         <AppText style={styles.text} variant='h2'>Presented By:</AppText>

         {/* Steve Madden Logo */}
         <Image source={presentingPartner.logo} style={styles.partnerLogo}/>

         {/* Partner Collage */}
         <AppText style={styles.text} variant='body'>Click on our partners to learn more!</AppText>
         <PartnerCollage/>
         <RNSButton
            caption="Partner With Us"
            bordered
            primary
            style={{ alignSelf: 'center' }}
            onPress={() => navigation.navigate('Contact')}
        />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 40,
    marginTop: 25,
  },
  divider: {
    width: '60%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginBottom: 20, 
    marginHorizontal: 20,
  },
  text:{
    textAlign: 'center',
  },
  partnerLogo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  listPadding: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  itemContainer: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // Optional: Add a light border or shadow to see the grid items
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
  },
  logo: {
    width: '90%',
    height: '90%',
  },
});
