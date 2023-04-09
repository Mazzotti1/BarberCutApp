import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FacebookLogo, } from 'phosphor-react-native';


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../lib/axios";

import * as Facebook from 'expo-auth-session/providers/facebook';

import { CLIENT_ID_FACEBOOK } from "@env";



export function FacebookSign  ()  {
  const { navigate } = useNavigation()
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: CLIENT_ID_FACEBOOK,
  });

  if (request) {
    console.log(
      "You need to add this url to your authorized redirect urls on your Facebook app: " +
        request.redirectUri
    );
  }

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
        (async () => {
          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication?.accessToken}&fields=id,name,picture.type(large)`
          );
          const userInfo = await userInfoResponse.json();
          setUser(userInfo);
          console.log(userInfo);
        })();
      }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Ops, algo deu errado");
      return;
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
        const user = await AsyncStorage.removeItem('facebookData');
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
      onPress={handlePressAsync}
      className='items-center flex-row p-2 w-fit rounded-xl mt-4 bg-blue-800'>
      <FacebookLogo size={32} color="#ededed" weight="thin" />
      <Text className='font-regular text-gray-300 text-xl '>Continuar com Facebook</Text>
    </TouchableOpacity>
  );
};


