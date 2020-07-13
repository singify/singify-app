import React, {useState,useContext} from 'react';
import { View, Text, Image, Share, Linking} from 'react-native';
import {material, human} from 'react-native-typography';
import { LoginButton, AccessToken, facebookService } from 'react-native-fbsdk';
import AuthContext from '../../context/AuthContext';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button, Icon, RadioButton, Appbar, IconButton, Colors, List, Searchbar } from 'react-native-paper';


function Invite(props) {

  const {currentUser} = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <><Appbar.Header style={{backgroundColor: '#303030'}}>
      <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      <Appbar.Content title="Invite a Friend" subtitle="" />
    </Appbar.Header>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>

      <View style={{height: '10%', width: '100%'}}>
        <View style={{padding: 15}}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>

      </View>
      
      <View style={{height: '90%', width: '100%'}}>

      </View>

    </View></>
  );
}

export default Invite;
