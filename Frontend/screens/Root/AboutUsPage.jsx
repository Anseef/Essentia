import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const AboutUsPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>About Essentia</Text>
        <Text style={styles.content}>Essentia is a comprehensive mobile application designed to empower users to take control of their daily lives by efficiently managing various aspects such as food, expenses, health, and habits. Our goal is to provide a user-friendly platform that helps individuals lead healthier, more organized, and fulfilling lives.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Our Mission</Text>
        <Text style={styles.content}>At Essentia, our mission is to simplify and enhance the way people manage their daily routines. We strive to create innovative solutions that promote personal growth, well-being, and productivity. Through our app, we aim to inspire positive changes and empower individuals to achieve their goals.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Contact Us</Text>
        <Text style={styles.content}>If you have any questions, suggestions, or feedback, we'd love to hear from you! You can reach out to us via email at 'essentia@official.com' or connect with us on social media 'EssentiaAPP'.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.content}>Thank you for choosing Essentia to be a part of your journey towards a more organized and fulfilling lifestyle!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontFamily: 'Bold',
    fontSize: 22,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'Medium',
    fontSize: 16,
  },
});

export default AboutUsPage;