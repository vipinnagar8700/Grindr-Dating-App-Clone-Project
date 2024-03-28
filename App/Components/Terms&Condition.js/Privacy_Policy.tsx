import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Colors from "../HelperComponents/Colors";

const Privacy_Policy = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setShowModal(false);
    // Redirect to privacy policy page
    navigation.navigate('SignUp');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Privacy & Policy</Text>
      <ScrollView>
        <View style={{marginBottom:45}}>
          <Text style={{ color:Colors.BLACK }}>
          Privacy Policy for "Single and Curious" Adult Dating App{'\n\n'}

This Privacy Policy describes how "Single and Curious" (the "App") collects, uses, and shares your personal information when you use the App. By using the App, you agree to the collection and use of information in accordance with this policy.{'\n\n'}

1. Information Collection and Use{'\n\n'}

1.1 Information You Provide: When you create an account on the App, you may be required to provide certain personal information, such as your name, email address, age, gender, location, and preferences. You may also choose to upload photos and provide additional information about yourself.{'\n\n'}

1.2 Automatically Collected Information: The App may automatically collect certain information about your device, including your IP address, device type, operating system, and browser type. This information is used for analytics purposes and to improve the functionality of the App.{'\n\n'}

2. Use of Information

2.1 To Provide and Personalize the App: We use the information we collect to provide and personalize the App, including matching you with potential matches based on your preferences.{'\n\n'}

2.2 To Communicate with You: We may use your email address to send you updates, newsletters, and promotional materials related to the App. You may opt-out of receiving these communications at any time by following the instructions provided in the emails.{'\n\n'}

2.3 To Improve the App: We use the information we collect to analyze trends, administer the App, track users' movements, and gather demographic information for aggregate use. This helps us improve the App and provide a better user experience.{'\n\n'}

3. Information Sharing{'\n\n'}

3.1 With Third-Party Service Providers: We may share your personal information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer support.{'\n\n'}

3.2 With Your Consent: We may share your personal information with third parties with your consent.{'\n\n'}

3.3 For Legal Reasons: We may disclose your personal information if required to do so by law or in response to a subpoena or other legal request.{'\n\n'}

4. Data Security{'\n\n'}

4.1 We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.{'\n\n'}

5. Children's Privacy{'\n\n'}

5.1 The App is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.{'\n\n'}

6. Changes to this Privacy Policy{'\n\n'}

6.1 We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.{'\n\n'}

7. Contact Us{'\n\n'}

7.1 If you have any questions about this Privacy Policy, please contact us at singleandcurious.com.{'\n\n'}

By using the App, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.{'\n\n'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for accepting/canceling terms */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
           Privacy & Policy
            </Text>
            <Text >
                I accept Privacy & Policy
            </Text>
            <View style={styles.modalButtons}>
              <Text style={{padding:20}}  onPress={handleCancel} >Cancel</Text><Text  style={{padding:20,color:'blue'}} onPress={handleAccept} >Accept</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Privacy_Policy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor:Colors.BACKGROUND,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    color:Colors.BLACK,
    fontFamily:'appfont-medium'
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.YELLOW,
    padding: 15,
    borderRadius: 10,
    bottom: 0,
    margin:20,
    width: "100%",
    position:'absolute'
  },
  buttonText: {
    fontSize: 18,
    fontFamily:'appfont-medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor:Colors.BLACK,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
