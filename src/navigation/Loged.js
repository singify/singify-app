import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// intro screen
// import IntroSliders from '../pages/intro/IntroSlides';

// auth screens
import Home from '../screens/home/Home';
import ProfileSetup from '../screens/home/ProfileSetup';
import Account from '../screens/account/Account';
import Invite from '../screens/account/Invite';

const Stack = createStackNavigator();

function Loged() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProfileSetup">
        <Stack.Screen
          name="ProfileSetup"
          options={{
            headerShown: false,
          }}
          component={ProfileSetup}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="Account"
          options={{
            headerShown: false,
          }}
          component={Account}
        />
        <Stack.Screen
          name="Invite"
          options={{
            headerShown: false,
          }}
          component={Invite}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Loged;
