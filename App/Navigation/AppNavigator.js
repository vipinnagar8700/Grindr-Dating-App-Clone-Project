import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Components/Screens/SplashScreen";
import SignIn from "../Components/Auth/SignIn";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import Term_Condition from "../Components/Terms&Condition.js/Term_Condition";
import Privacy_Policy from "../Components/Terms&Condition.js/Privacy_Policy";
import BirthdayScreen from "../Components/Screens/BirthdayScreen";
import SignUp from "../Components/Auth/SignUp";
import CompleteProfile from "../Components/Auth/CompleteProfile";
import ChatScreen from "../Components/Home/ChatScreen";
import Filter from "../Components/Screens/Filters";
import TabNavigation from "./TabNavigation";
import ViewedMeScreen from "../Components/Home/ViewedMeScreen";
import EditProfileScreen from "../Components/Home/EditProfileScreen";
import SettingScreen from "../Components/Home/SettingScreen";
import SingleUserProfile from "../Components/Home/SingleUserProfile";
import MyAlbum from "../Components/Screens/MyAlbum";
import AboutApp from "../Components/Terms&Condition.js/AboutApp";
import TestScreen from "../Components/Screens/TestScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
     
  
      <Stack.Screen initialRouteName="SplashScreen"
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Term_Condition"
        component={Term_Condition}
        options={{ headerShown: false }}
      />
       <Stack.Screen
      name="MyAlbumScreen"
      component={MyAlbum}
      options={{ headerShown: false }}
    />
      <Stack.Screen
        name="Privacy_Policy"
        component={Privacy_Policy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About_app"
        component={AboutApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BirthdayScreen"
        component={BirthdayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="SingleUserProfile"
        component={SingleUserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewedMeScreen"
        component={ViewedMeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
