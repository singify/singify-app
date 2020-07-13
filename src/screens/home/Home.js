import React, {useState,useContext,useRef} from 'react';
import { View, Text, Image} from 'react-native';
import {material, human} from 'react-native-typography';
import AuthContext from '../../context/AuthContext';
import { Appbar, IconButton, Colors, Button, Icon, RadioButton } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FBSDK from 'react-native-fbsdk'
import {LivePlayer} from "react-native-live-stream";
import {getFbAccessToken} from '../../utils/FBToken';

function Home(props) {

  const { AccessToken, GraphRequest, GraphRequestManager } = FBSDK
  const {currentUser} = useContext(AuthContext);

  const [gender, setGender] = useState('male');

  const refRBSheet = useRef();
  const videoRef = useRef();


  //Create response callback.
  // function _responseInfoCallback(error: ?Object, result: ?Object) {
  //   if (error) {
  //     console.log('Error fetching data: ' + (JSON.stringify(error)).toString());
  //   } else {
  //     console.log('Success fetching data: ' + (JSON.stringify(result)).toString());
  //   }
  // }

  const goLive=()=>{

    // Create a graph request asking for user information with a callback to handle the response.
    // const infoRequest = new GraphRequest(
    //   `/me/live_videos/status=LIVE_NOW&access_token=${getFbAccessToken()}&title=Demo%20live&description=live%20api%20testing`,
    //   null,
    //   _responseInfoCallback,
    // );
    // Start the graph request.
    // new GraphRequestManager().addRequest(infoRequest).start();

    // getFbAccessToken();
    AccessToken.getCurrentAccessToken()
    .then(response => {
      console.log(response)

      let fetchData = { 
          method: 'POST', 
      }
      // curl -i -X POST \
      // "https://graph.facebook.com/v7.0/161132312280080/live_videos?status=LIVE_NOW&access_token=EAALfgdWIBpIBAHGOZBEkuMOUUm35y2eCJDpa9PJAKi6pANQCc9zr3YmsEfvF65k2ougC0umi75mZAe4Dc67wKpdTPsbQrASxO8mfi3i9UqHCO2A7L2W7hbvv1WpKDHhoZBS6xZAGnis8YstdKL65hroRoHG2NkwZB3ByPP7XdSZAj7nNUM3h52xKoZAOOVrETWZCiTepx1T7gwZDZD"
      fetch(`https://graph.facebook.com/v7.0/${response.userID}/live_videos?status=LIVE_NOW&access_token=${response.accessToken}&title=Demo%20live&description=live%20api%20testing`,fetchData)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.error) {
          alert(response.error.message)
        }else{
          alert(response.data)
        }
      })
      .catch(e => {
        console.log(e);
        alert(e.message);
      });

    })
    .catch(e => console.log(e));
  }

  return (
    <><Appbar.Header style={{backgroundColor: '#303030'}}>
      <Appbar.Content title="" subtitle="" />
      <Appbar.Action icon="account-circle" onPress={()=>props.navigation.navigate('Account')} />
    </Appbar.Header>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>

      <View style={{height: '90%', width: '100%'}}>
        <LivePlayer source={{uri:"rtmps://live-api-s.facebook.com:443/rtmp/161132935613351?s_bl=1&s_sc=161132945613350&s_sw=0&s_vt=api-s&a=AbwxUo34Zeqhd2P5"}}
           ref={videoRef}
           style={{width: '100%', height: 320}}
           paused={false}
           muted={false}
           bufferTime={300}
           maxBufferTime={1000}
           resizeMode={"contain"}
           onLoading={()=>{}}
           onLoad={()=>{}}
           onEnd={()=>{}}
        />
      </View>

      <View style={{width: '100%', height: '5%', zIndex: 1}}>
      <IconButton
          icon={({ size, color }) => (
              <Image
                source={require('../../../assets/images/record.png')}
                style={{ width: size, height: size }}
              />
            )}
          color={Colors.red500}
          size={50}
          style={{position: 'absolute', left: '38%', top: 0}}
          onPress={() => refRBSheet.current.open()}
        />
      </View>
      
      <View style={{width: '100%', height: '5%'}}>
        <View style={{width: '100%', backgroundColor: '#404040', height: '100%'}}>
          <Text>{" "}</Text>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={200}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          container: {
            backgroundColor: "#404040",
          },
          draggableIcon: {
            backgroundColor: "#fff"
          }
        }}
      >
        <View style={{paddingVertical: 35, paddingHorizontal: 80, justifyContent: 'center'}}>
          
          <View style={{backgroundColor: '#000', borderRadius: 6, padding: 5}}>
            <Button style={{width: 120}} mode="contained" onPress={() => goLive()}>
              Go{" "}Live
            </Button>
            <Text style={{position: 'absolute', color: '#fff', right: 35, top: 10, fontSize: 16}}>with <MaterialIcon size={21} name="facebook-box"></MaterialIcon> </Text>
          </View>

          <View style={{backgroundColor: '#000', borderRadius: 6, padding: 5, marginTop: 20}}>
            <Button style={{width: 120}} mode="contained" onPress={() => null}>
              Play
            </Button>
            <Text style={{position: 'absolute', color: '#fff', right: 35, top: 10, fontSize: 16}}>with <MaterialIcon size={21} name="account-circle"></MaterialIcon> </Text>
          </View>

        </View>
      </RBSheet>

    </View></>
  );
}

export default Home;
