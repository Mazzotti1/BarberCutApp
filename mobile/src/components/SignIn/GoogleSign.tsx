import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";


WebBrowser.maybeCompleteAuthSession();
export function GoogleSign  ()  {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:"897651155535-nsd7fgkfmr6qvkqk730io0ebp9mch3go.apps.googleusercontent.com",
    iosClientId: "897651155535-rifudjpahq7nlb2v8jlj8apkdf4cad73.apps.googleusercontent.com",
    androidClientId: "897651155535-orpdk8m4cjrl72aji9a5c4c8uckhcgvs.apps.googleusercontent.com",


  });
  useEffect(() => {

    if (response?.type === "success") {
      setToken(response.authentication?.accessToken ?? '');
     token && getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {

    }
  };

  return (
    <TouchableOpacity
      disabled={!request}
      onPress={() => {promptAsync()}}
      className='items-center flex-row p-2 w-fit rounded-xl mt-4 bg-slate-600'>
      <GoogleLogo size={32} color="#ededed" weight="thin" />
      <Text className='font-regular text-gray-300 text-xl '>Continuar com Google</Text>
    </TouchableOpacity>
  );
};


