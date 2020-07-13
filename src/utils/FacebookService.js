import React from 'react'
import FBSDK from 'react-native-fbsdk'

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager()
  }

  makeLoginButton(callback) {
    return (
      <LoginButton
        style={{ width: 230, height: 32, fontSize: 28 }}
        defaultButtonStyle={{height: 90}}
        publishPermissions={["email","publish_video", "user_friends"]}
        permissionss={["public_profile", "publish_video", "user_friends"]}
        readPermissions={["public_profile", "publish_video", "user_friends"]}
        onLoginFinished={(error, result) => {
          if (error) {

          } else if (result.isCancelled) {

          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                callback(data.accessToken)
              })
              .catch(error => {
                console.log(error)
              })
          }
        }} />
    )
  }

  chechLogin(callback){
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      return callback(data.accessToken)
    })
    .catch(error => {
      console.log(error)
    })
  }

  makeLogoutButton(callback) {
    return (
      <LoginButton onLogoutFinished={() => {
        callback()
      }} />
    )
  }

  async fetchProfile(callback) {
    return new Promise((resolve, reject) => {
      const request = new GraphRequest(
        '/me',
        null,
        (error, result) => {
          if (result) {
            const profile = result
            profile.avatar = `https://graph.facebook.com/${result.id}/picture`
            resolve(profile)
          } else {
            reject(error)
          }
        }
      )

      this.requestManager.addRequest(request).start()
    })
  }
}

export const facebookService = new FacebookService()