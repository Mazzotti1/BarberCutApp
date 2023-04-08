import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../lib/axios";



export function GoogleSign  ()  {
  const { navigate } = useNavigation()
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:"897651155535-nsd7fgkfmr6qvkqk730io0ebp9mch3go.apps.googleusercontent.com",
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
        });

      const user = await response.json();
      setUserInfo(user);
      const email = user.email;
      const password = user.id;
      handleLogin(email, password);
      await AsyncStorage.setItem('googleData', JSON.stringify(user))
    } catch (error) {
      console.log('erro no login')
    }
  };

  async function saveUser(token:string) {
    await AsyncStorage.setItem('userToken', JSON.stringify(token))
  }

  const handleLogin = async (email: string, password: string) => {
    if (email && password) {
      try {
        const response =  await api.post('/login', { email, password });
        const token = response.data;
        await saveUser(token);
        const user = await AsyncStorage.removeItem('googleData');
        Alert.alert('Login realizado com sucesso!');
        navigate('home');
      } catch (error) {
        navigate('register');
      }
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


