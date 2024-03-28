import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '../HelperComponents/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const SplashScreen = ({ navigation }) => {


  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Check if user ID and token exist in AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      console.log(userId,"userId Token")

      if (userId && userId ) {
        // If both user ID and token exist, navigate to HomeScreen
        setTimeout(() => {
          navigation?.replace('HomeScreen');
        }, 5000); // 5 seconds delay
      } else {
        // If user ID or token doesn't exist, navigate to SignIn screen
        setTimeout(() => {
          navigation?.replace('SignIn');
        }, 5000); // 5 seconds delay
      }
    };

    // Call the function to check user login status
    checkUserLoggedIn();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/splash.png')}
        style={styles.image}
        resizeMode="contain" // Adjust the resizeMode as per your requirement
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '40%', // Adjust the width of the image as needed
    height: '100%', // Ensure the image takes up the entire height of its container
  },
});
