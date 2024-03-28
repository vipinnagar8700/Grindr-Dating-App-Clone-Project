import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';

const TestScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = new Animated.Value(0);

  const toggleDrawer = () => {
    console.log("first")
    const newValue = !isDrawerOpen ? 1 : 0;
    setIsDrawerOpen(newValue);
    Animated.timing(drawerAnimation, {
      toValue: newValue,
      duration: 300, // Adjust duration as needed
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300, // Adjust duration as needed
      useNativeDriver: false,
    }).start(() => {
      setIsDrawerOpen(false);
    });
  };

  const overlayOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5], // Adjust opacity as needed
  });

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0], // Adjust the width of the drawer
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, { opacity: overlayOpacity }]}>
          {/* Empty view to capture touch events */}
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerTranslateX }] }]}>
        <TouchableOpacity onPress={closeDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        <Text>Drawer Content</Text>
      </Animated.View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'black',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 200, // Adjust as needed
    backgroundColor: 'white',
    zIndex: 2, // Higher zIndex than the overlay
    elevation: 10, // Android elevation
    justifyContent: 'center',
    padding: 20,
  },
});
