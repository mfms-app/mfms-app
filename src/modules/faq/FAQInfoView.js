import React, { useState,  useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { colors, fonts } from '../../styles';

const initialFaqData = [
  { id: '1', question: 'What does a Summit Day ticket give me access to?', answer: 'The Summit Day ticket gives you access to all the speaking engagements, networking with industry professionals, and corporate activation booths. Sign-ups for our one-on-one coffee chat series and Lunch and Learn will be given out on a first come first serve basis, so make sure to get there early!', expanded: false },
  { id: '2', question: 'What does the VIP ticket give me access to?', answer: 'The VIP ticket gives you all the perks of the Summit Day ticket, plus access to our exclusive Thursday Night Launch Party (TNLP). Only 100 tickets are available, so purchase while you can!', expanded: false },
  { id: '3', question: 'What is the TNLP?', answer: 'The annual Thursday Night Launch Party marks the official kickoff of our summit, bringing together the MFMS student planning team, partners, speakers, and VIP guests for a memorable evening featuring unique activations, cocktails and more!', expanded: false },
  { id: '4', question: 'Do I have to stay for the entire event or can I leave if I have a prior commitment?', answer: 'We would love it if you could stay, but you can leave as needed during the day as long as you bring your credentials when you return.', expanded: false },
  { id: '5', question: 'What is the dress code for the TNLP and the Summit?', answer: 'TNLP is cocktail and Summit day is business professional. No matter what you wear, dress to impress!', expanded: false },
  { id: '6', question: 'Is there parking nearby?', answer: 'Yes! There is paid parking in Ross on the Hill Street side of the building as well as metered parking on the streets surrounding the building. There are also side streets with free parking, but those spots are very limited.', expanded: false },
  { id: '7', question: 'What should I bring with me to the Summit?', answer: 'You should bring an updated resume and something to write with. Your credentials will be given to you upon your arrival at the event, so do not worry about having that before Friday!', expanded: false },
  { id: '8', question: 'How do I sign up for coffee chats or the Lunch and Learn?', answer: 'You can register for a coffee chat with one of our networking partners as well as the lunch and learn at the check in table.', expanded: false },
];

const FAQPage = ({ navigation }) => {
  

  const [faqData, setFaqData] = useState(initialFaqData);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setFaqData(initialFaqData);
  }, []);

  // Toggle expanded state
  const toggleExpand = (id) => {
    setFaqData((prevData) =>
      prevData.map((item) => ({
        ...item,
        expanded: item.id === id ? !item.expanded : false, // Close all others
      }))
    );
  };

  // Filtered FAQs based on search query
  const filteredFaqData = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* FAQ Title */}
      <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      <Text size = {2}></Text>
      <Text style={styles.headerSubtitle}>
        Can't find your question? We are happy to help you at the check-in table.
      </Text>
      <Text size = {2}></Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search FAQs"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* FAQ List */}
      <FlatList
        data={filteredFaqData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(item.id)}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={styles.toggleIcon}>
                {item.expanded ? '−' : '+'}
              </Text>
            </TouchableOpacity>
            {item.expanded && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: colors.black,
    fontFamily: "NeueHaasDisplayRoman",
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray,
    marginBottom: 17,
    fontFamily: "NeueHaasDisplayRoman",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 17,
    fontFamily: "NeueHaasDisplayRoman",
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontFamily: "NeueHaasDisplayRoman",
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1, // Allow text to take available space
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
    marginRight: 10, // Space between text and icon
    fontFamily: "NeueHaasDisplayRoman",
  },
  toggleIcon: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
  },
  answerText: {
    marginTop: 8,
    fontSize: 15,
    color: colors.gray,
    lineHeight: 20,
    fontFamily: "NeueHaasDisplayRoman",
  },
});

export default FAQPage;
