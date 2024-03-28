import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons'; // Import icons from Expo vector icons

import HomeScreen from '../Components/Home/HomeScreen';
import Inbox from '../Components/Home/Inbox';
import StoreScreen from '../Components/Home/StoreScreen';
import Colors from '../Components/HelperComponents/Colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            // Set icons based on route name
            if (route.name === 'Browse') {
              iconName = 'home'; // Change to the name of your home icon
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === 'Inbox') {
              iconName = 'inbox'; // Change to the name of your inbox icon
              return <FontAwesome name={iconName} size={size} color={color} />;
            } else if (route.name === 'Faves') {
              iconName = 'star'; // Change to the name of your favorites icon
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === 'Store') {
              iconName = 'shop'; // Change to the name of your store icon
              return <Entypo name={iconName} size={size} color={color} />;
            }
          },
          tabBarLabelStyle: {
            fontSize: 12, 
            fontFamily:'appfont-medium',// Adjust the font size as needed
          },
          tabBarActiveTintColor: Colors.YELLOW, // Change the color for active tab
          tabBarInactiveTintColor: Colors.WHITE, // Change the color for inactive tab
          tabBarStyle: {
            backgroundColor:"#373737", // Set the background color of the bottom tab navigator
            borderTopWidth: 0,
        
          
          },
        })}
      >
        <Tab.Screen name="Browse" component={HomeScreen} options={{ title: 'Home',headerShown:false }} />
        <Tab.Screen name="Inbox" component={Inbox} options={{ title: 'Messages' ,headerShown:false }} />
        {/* <Tab.Screen name="Faves" component={FavesScreen} options={{ title: 'Favorites',headerShown:false  }} /> */}
        <Tab.Screen name="Store" component={StoreScreen} options={{ title: 'Upgrade' ,headerShown:false }} />
      </Tab.Navigator>
  );
}

export default TabNavigation;
