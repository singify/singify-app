import React from 'react'
import FBSDK from 'react-native-fbsdk'

const { AccessToken } = FBSDK

const getFbAccessToken=()=>{
	AccessToken.getCurrentAccessToken()
		.then((data) => {
		  console.log('data');
		  console.log(data);
		  return data.accessToken;
		})
		.catch(error => {
		  console.log(error)
	})
}

export {getFbAccessToken}