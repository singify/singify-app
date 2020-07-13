import React, {useState,useContext} from 'react';
import { View, Text, Image, Share, Linking} from 'react-native';
import {material, human} from 'react-native-typography';
import { LoginButton, AccessToken, facebookService } from 'react-native-fbsdk';
import AuthContext from '../../context/AuthContext';
import { Button, Icon, RadioButton } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Appbar } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';
import { List } from 'react-native-paper';

function Account(props) {

  const {currentUser} = useContext(AuthContext);

  const [gender, setGender] = useState('male');

  const shareApp=async()=>{
    try {
      const result = await Share.share({
        message:
          'Walkman | Online music antakshari. Install the app now! http://play.google.com/store/apps/details?id=com.techconductor.walkman',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const rateApp=()=>{
    //open in browser
    return Linking.openURL('http://play.google.com/store/apps/details?id=com.techconductor.walkman');

    Linking.canOpenURL('play://').then(supported => {
      if (supported) {
        return Linking.openURL('play://');
      } else {
        return Linking.openURL('http://play.google.com/store/apps/details?id=com.techconductor.walkman');
      }
    });
  }

  return (
    <><Appbar.Header style={{backgroundColor: '#303030'}}>
      <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      <Appbar.Content title="Account" subtitle="" />
    </Appbar.Header>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>

      <View style={{height: '20%'}}>
        <View style={{padding: 20, marginTop: 20}}>
	      <Image source={{uri: currentUser.avatar+'?height=415&width415'}} 
	            resizeMode="center"
	            style={{height: 95, width: 95, borderRadius: 90}} />
        </View>
      </View>
      
      <View style={{height: '10%'}}>
        <Text style={[material.title, human.bold, {color: '#f2f2f2', textAlign: 'center'}]}>{currentUser.name}</Text>
      </View>

      <View style={{height: '70%', width: '100%'}}>
        <View>
          <List.Section>
            <List.Subheader style={{color: '#e2e2e2'}}>Account</List.Subheader>
            <List.Item
              title="Edit Profile"
              titleStyle={{padding: 0, color: '#fff'}}
              style={{padding: 0, marginLeft: 10}}
              left={() => <List.Icon color="#fff" icon="account-edit" />}
            />

            <List.Subheader style={{color: '#e2e2e2'}}>More</List.Subheader>

            <List.Item
              title="Invite"
              titleStyle={{padding: 0, color: '#fff'}}
              style={{padding: 0, marginLeft: 10}}
              onPress={()=>props.navigation.navigate('Invite')}
              left={() => <List.Icon color="#fff" icon="account-multiple-plus" />}
            />
            <List.Item
              title="Share"
              titleStyle={{padding: 0, color: '#fff'}}
              style={{padding: 0, marginLeft: 10}}
              onPress={()=>shareApp()}
              left={() => <List.Icon color="#fff" icon="share-variant" />}
            />
            <List.Item
              title="Rate"
              titleStyle={{padding: 0, color: '#fff'}}
              style={{padding: 0, marginLeft: 10}}
              onPress={()=>rateApp()}
              left={() => <List.Icon color="#fff" icon="star" />}
            />
          </List.Section>
        </View>
      </View>

    </View></>
  );
}

export default Account;
