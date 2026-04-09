import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Linking, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors } from '../../styles';
import AppText from '../../components/Text';
import RNSButton from '../../components/Button';

const ticketOptions = [
  {
    title: 'General Admissions',
    price: '$35',
    description: 'This is an all inclusive ticket to the summit from 8am-5pm',
  },
  {
    title: 'VIP Ticket',
    price: '$45',
    description: 'This ticket includes the summit and the Thursday Night Launch Party',
  },
  {
    title: 'Virtual Ticket',
    price: '$15',
    description: 'This ticket includes a virtual link to watch the summit live from 8am-5pm',
  },
];

const TicketsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}> 
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}> 
        <AppText style={styles.text} variant='h1'>Tickets</AppText>
        <View style={styles.divider}/>
        <View style={styles.container}>
          <AppText style={styles.text} variant='body'>The MFMS handles all ticket transactions through Eventbrite. Click the button below to be redirected to an external site where you can purchase your ticket.</AppText>
          <RNSButton
            caption="Purchase Tickets"
            bordered
            primary
            onPress={() => Linking.openURL('https://www.eventbrite.com/e/michigan-fashion-media-summit-2026-tickets-1983105754696?aff=ebdsoporgprofile')}
            style={{ alignSelf: 'center'}}
          />
        </View>

        <View style={styles.container} >
          <AppText style={styles.text} variant='body'>Attendees can purchase three types of tickets to the MFMS</AppText>
          {ticketOptions.map((ticket, index) => (
          <TouchableOpacity key={index} style={{ marginTop: 20 }}>
          <View style={styles.headerRow}>
            <AppText variant='h3'>{ticket.title}</AppText>
            <AppText variant='h3'>{ticket.price}</AppText>
          </View>
          <AppText variant='body' style={styles.description}>
            {ticket.description}
          </AppText>
         </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 40,
    marginTop: 25,
  },
  text:{
    textAlign: 'center',
  },
  divider: {
    width: '60%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginHorizontal: 20,
  },
  container: {
    marginHorizontal: 40,
    marginTop: 40,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  description: {
   paddingRight: 60,
  }
});

export default TicketsScreen;
