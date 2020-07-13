import React, {useState,useContext} from 'react';
import { View, Text, Image} from 'react-native';
import {material, human} from 'react-native-typography';
import { LoginButton, AccessToken, facebookService } from 'react-native-fbsdk';
import AuthContext from '../../context/AuthContext';
import { Button, Icon, RadioButton } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

function ProfileSetup(props) {

  const {currentUser} = useContext(AuthContext);
  const [gender, setGender] = useState('male');

  console.log(currentUser)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
      
      <View style={{height: '33%'}}>
        <View style={{padding: 20, marginTop: 20}}>
	      <Image source={{uri: currentUser.avatar+'?height=415&width415'}} 
	            resizeMode="center"
	            style={{height: 154, width: 154, borderRadius: 90}} />
        </View>
      </View>
      
      <View style={{height: '13%'}}>
        <Text style={[material.display1, human.bold, {color: '#f2f2f2', textAlign: 'center'}]}>Hi.{'\n'}{currentUser.name}</Text>
      </View>
      
      <View style={{height: '20%', flexDirection: 'row'}} >
        <View style={{flex:2, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Text style={[material.title, human.bold, {color: '#f2f2f2', textAlign: 'center'}]}>Male</Text>
          <RadioButton
            value="first"
            uncheckedColor="#fff"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => { setGender('male') }}
          />
        </View>
        <View style={{flex:2, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Text style={[material.title, human.bold, {color: '#f2f2f2', textAlign: 'center'}]}>Female</Text>
          <RadioButton
            value="first"
            uncheckedColor="#fff"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => { setGender('female') }}
          />
        </View>
      </View>

      <View style={{height: '33%'}}>

        <Button 
          compact={true} 
          icon={()=><AwesomeIcon size={20} color="#fff" name="arrow-right" />}
          mode="contained"
          contentStyle={{height: 60, width: 60}}
          style={{borderRadius: 50, fontSize: 21}} 
          onPress={() => props.navigation.navigate('Home')}>
        </Button>

      </View>

    </View>
  );
}

export default ProfileSetup;
