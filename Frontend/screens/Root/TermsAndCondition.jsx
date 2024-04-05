import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.header}>1. Acceptance of Terms</Text>
        <Text style={styles.content}>By accessing or using the App, you agree to be bound by these Terms and Conditions, including any additional guidelines and future modifications. If you do not agree to these terms, you may not access or use the App.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>2. Use of the App</Text>
        <Text style={styles.content}>2.1. You must be at least 18 years old or have the consent of a legal guardian to use the App.</Text>
        <Text style={styles.content}>2.2. You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.</Text>
        <Text style={styles.content}>2.3. You agree to use the App only for lawful purposes and in accordance with these Terms and Conditions.</Text>
        <Text style={styles.content}>2.4. You may not use the App in any manner that could damage, disable, overburden, or impair the functionality of the App.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>3. Privacy Policy</Text>
        <Text style={styles.content}>By using the App, you agree to the collection and use of information in accordance with our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and disclose your information.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>4. Intellectual Property</Text>
        <Text style={styles.content}>4.1. The content and features of the App, including but not limited to text, graphics, logos, images, and software, are owned by or licensed to Essentia and are protected by copyright, trademark, and other intellectual property laws.</Text>
        <Text style={styles.content}>4.2. You may not modify, reproduce, distribute, transmit, display, perform, or create derivative works of any content or features of the App without prior written consent from Essentia.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>5. Disclaimer of Warranties</Text>
        <Text style={styles.content}>5.1. The App is provided on an "as is" and "as available" basis. Essentia makes no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or availability of the App.</Text>
        <Text style={styles.content}>5.2. Essentia does not guarantee that the App will be error-free or uninterrupted, or that defects will be corrected. You acknowledge that your use of the App is at your own risk.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>6. Limitation of Liability</Text>
        <Text style={styles.content}>6.1. In no event shall Essentia or its affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the App, including but not limited to loss of profits, data, or goodwill.</Text>
        <Text style={styles.content}>6.2. Essentia's total liability for any claim arising out of or related to the App shall not exceed the amount paid by you, if any, for accessing or using the App.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>7. Changes to Terms and Conditions</Text>
        <Text style={styles.content}>Essentia reserves the right to modify or replace these Terms and Conditions at any time without prior notice. Your continued use of the App after any such changes constitutes your acceptance of the new Terms and Conditions.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>8. Governing Law</Text>
        <Text style={styles.content}>These Terms and Conditions shall be governed by and construed in accordance with the laws of Jurisdiction, without regard to its conflict of law principles.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>9. Contact Us</Text>
        <Text style={styles.content}>If you have any questions or concerns about these Terms and Conditions, please contact us at [essentia@official.com].</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.content, { paddingBottom: 20 }]}>By using the Essentia mobile application, you agree to abide by these terms and conditions. Thank you for using Essentia!</Text>
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
  },
  content: {
    fontFamily: 'Medium',
    fontSize: 16,
  },
});

export default TermsAndConditions;
