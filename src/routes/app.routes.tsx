import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../screens/home';
import { Score } from '../screens/score';
import { Farms } from '../screens/farms';
import { AddNewFarm } from '../screens/farms/add_new_farm';
import DrawerContent from '../components/DrawerContent';
import { useTheme } from 'styled-components';

type AppRoutes = {
  home: undefined;
  score: {scoreId: string};
  farms: undefined;
  farm_edition: {nameFarm: string, nicknameFarm: string, id: string};
};


export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes> 

export const AppRoutes = () => {
const Stack = createNativeStackNavigator<AppRoutes>();
const Drawer = createDrawerNavigator();

const { FONT_SIZE, COLORS } = useTheme();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="score" component={Score} />
      <Stack.Screen name="farms" component={Farms} />
      <Stack.Screen name="farm_edition" component={AddNewFarm} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Menu" component={StackNavigator} options={{ headerStyle: { backgroundColor: COLORS.GRAY_600, }, headerTintColor: COLORS.GRAY_100, headerShown: false}} />
    </Drawer.Navigator>
  );
};


  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

// import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Home } from '../screens/home';
// import { Score } from '../screens/score';


// type AppRoutes = {
//   home: undefined;
//   score: {scoreId: string};
// };

// export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes> 
// const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()


// export function AppRoutes() {

//   return (
//     <Navigator screenOptions={{ headerShown: false }}>
//       <Screen 
//         name="home"
//         component={Home}
//       />
//       <Screen 
//         name="score"
//         component={Score}
//       />
//     </Navigator>
//   )
// }

