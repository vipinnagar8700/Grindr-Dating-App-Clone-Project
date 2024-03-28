import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import Colors from "../HelperComponents/Colors";

const Term_Condition = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setShowModal(false);
    // Redirect to privacy policy page
    navigation.navigate('Privacy_Policy');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Terms & Conditions</Text>
      <ScrollView>
        <View style={{marginBottom:45}}>
          <Text style={{ color:Colors.BLACK,fontFamily:'appfont-light',fontSize:14 }}>
          terms and Conditions of Use for "Single and Curious" Adult Dating App{'\n\n'}

Welcome to "Single and Curious" (the "App"). The following Terms and Conditions of Use ("Terms") govern your access to and use of the App. By accessing or using the App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the App.{'\n\n'}

1. Eligibility{'\n\n'}

1.1 You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are at least 18 years old.{'\n\n'}

2. Registration{'\n\n'}

2.1 You may be required to create an account and provide certain information to access certain features of the App. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.{'\n\n'}

3. Use of the App{'\n\n'}

3.1 You agree to use the App in compliance with all applicable laws and regulations.{'\n\n'}

3.2 You agree not to use the App for any unlawful or prohibited purpose or in any manner that could damage, disable, overburden, or impair the App.{'\n\n'}

4. Content{'\n\n'}

4.1 You are solely responsible for any content, including but not limited to profile information, photos, messages, and other materials, that you upload, post, or transmit through the App ("User Content").{'\n\n'}

4.2 By uploading, posting, or transmitting User Content, you grant the Company a non-exclusive, royalty-free, perpetual, worldwide, irrevocable, and sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content in connection with the operation and promotion of the App.{'\n\n'}

5. Privacy{'\n\n'}

5.1 Your use of the App is subject to the Company's Privacy Policy, which is incorporated into these Terms by reference.{'\n\n'}

6. Termination{'\n\n'}

6.1 The Company reserves the right to suspend or terminate your access to the App at any time and for any reason, without notice.{'\n\n'}

7. Disclaimers{'\n\n'}

7.1 The App is provided on an "as is" and "as available" basis. The Company makes no representations or warranties of any kind, express or implied, regarding the App.{'\n\n'}

7.2 The Company does not guarantee the accuracy, completeness, or reliability of any content available through the App.{'\n\n'}

8. Limitation of Liability{'\n\n'}

8.1 To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the App; (ii) any conduct or content of any third party on the App; or (iii) unauthorized access, use, or alteration of your transmissions or content.{'\n\n'}

9. Governing Law{'\n\n'}

9.1 These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.{'\n\n'}

10. Changes to Terms{'\n\n'}

10.1 The Company reserves the right to modify or revise these Terms at any time. You are responsible for regularly reviewing these Terms. Your continued use of the App after any changes to these Terms constitutes your acceptance of such changes.{'\n\n'}

11. Contact Us{'\n\n'}

11.1 If you have any questions about these Terms, please contact us.{'\n\n'}

By using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms.{'\n\n'}
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
           Terms & Conditions
            </Text>
            <Text >
                I accept terms & conditions
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

export default Term_Condition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor:Colors.BACKGROUND,
  },
  header: {
    fontSize: 20,
   fontFamily:'appfont-medium',
    marginBottom: 20,
    color:Colors.BLACK,
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
    marginBottom: 0,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
