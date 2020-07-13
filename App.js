/**
 * Walkman app
 *
 * @version 1.0.0
 * @author [Om](https://github.com/om-mahato)
 */

import * as React from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AccessToken} from 'react-native-fbsdk';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import AuthContext from './src/context/AuthContext';

import Guest from './src/navigation/Guest';
import Loged from './src/navigation/Loged';

export default (App = () => {

  const [isLogedIn, setLogin] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState('guest');

  React.useEffect(() => {
    SplashScreen.hide();
    CheckFacebookLogin();
  }, []);

  const CheckFacebookLogin=()=>{
  	AccessToken.getCurrentAccessToken()
  	.then((data) => {
  		console.log('data==========');
  		console.log(data);
  		// setLogin(data.accessToken);
  	})
  	.catch(error => {
  	  console.log(error)
  	});
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#cb0332',
      accent: '#fff',
    },
  };


  return (
  	<>
  	  <PaperProvider theme={theme}>
	  	  <AuthContext.Provider value={{currentUser, setCurrentUser}}>
	  	    {console.log(currentUser)}
	  	    {currentUser === 'guest' ? <Guest /> : <Loged />}
	  	  </AuthContext.Provider>
  	  </PaperProvider>
  	</>
  );

});
