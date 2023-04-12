import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GoogleLogo } from 'phosphor-react-native';


import * as Google from "expo-auth-session/providers/google";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../lib/axios";

import { EXPO_CLIENT__ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

export function GoogleSign  ()  {
  const { navigate } = useNavigation()
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: EXPO_CLIENT__ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
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
      className='items-center flex-row p-2 w-fit rounded-xl mt-4 bg-red-500'>
      <GoogleLogo size={32} color="#ededed" weight="thin" />
      <Text className='font-regular text-gray-300 text-xl '>Continuar com Google</Text>
    </TouchableOpacity>
  );
};


