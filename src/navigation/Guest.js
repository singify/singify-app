import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// intro screen
// import IntroSliders from '../pages/intro/IntroSlides';

// auth screens
import Login from '../screens/auth/Login';

const Stack = createStackNavigator();

function Guest() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Guest;
