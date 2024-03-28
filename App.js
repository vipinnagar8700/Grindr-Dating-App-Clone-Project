import React, { useEffect ,useState} from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./App/Navigation/AppNavigator";
import Colors from "./App/Components/HelperComponents/Colors";
import SplashScreen from "./App/Components/Screens/SplashScreen";


export default function App() {

  const [fontsLoaded] = useFonts({
    'appfont-semi': require('./assets/fonts/Outfit-Black.ttf'),
    'appfont-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'appfont-extraBold': require('./assets/fonts/Outfit-ExtraBold.ttf'),
    'appfont-extraLight': require('./assets/fonts/Outfit-ExtraLight.ttf'),
    'appfont-light': require('./assets/fonts/Outfit-Light.ttf'),
    'appfont-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'appfont': require('./assets/fonts/Outfit-Regular.ttf'),
    'appfont-semiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'appfont-thin': require('./assets/fonts/Outfit-Thin.ttf'),
  });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulating some asynchronous initialization
    setTimeout(() => {
      setAppReady(true);
    }, 2000); // Adjust the delay as needed
  }, []);


  if (!fontsLoaded || !appReady) {
    return <SplashScreen  />;
  }

  
  
  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
