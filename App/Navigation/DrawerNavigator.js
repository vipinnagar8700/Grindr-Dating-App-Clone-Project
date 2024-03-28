
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';



const Drawer = createDrawerNavigator();



const DrawerNavigator = () => {
  return (
      <Drawer.Navigator>
     <Drawer.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
