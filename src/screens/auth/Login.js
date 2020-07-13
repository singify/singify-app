import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Image} from 'react-native';
import {material, human} from 'react-native-typography';
// import { LoginButton, AccessToken, facebookService } from 'react-native-fbsdk';
import {facebookService} from '../../utils/FacebookService';
import AuthContext from '../../context/AuthContext';

export default function Login(props) {

  const {currentUser, setCurrentUser} = useContext(AuthContext);

  // const [currentUser, setCurrentUser] = useState('guest');

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData=async()=>{
    const profile = await facebookService.fetchProfile();
    if (profile !== null && profile.id !== undefined) {
      setCurrentUser(profile);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
      <View style={{height: '33%'}}>
        <View style={{padding: 20, marginTop: 20}}>
	      <Image source={require('../../../assets/images/logo_round.png')} 
	            resizeMode="center"
	            style={{height: 154, width: 154}} />
        </View>
      </View>
      <View style={{height: '33%'}}>
	    <Text style={[material.display2, human.bold, {color: '#f2f2f2', textAlign: 'center'}]}>Join The{'\n'}Community</Text>
      </View>
      <View style={{height: '33%'}}>
        <View style={{height: 50}}>

            {facebookService.makeLoginButton((accessToken) => {
              console.log(accessToken);
              setCurrentUser('User');
            })}
          </View>
      </View>

    </View>
  );
}
