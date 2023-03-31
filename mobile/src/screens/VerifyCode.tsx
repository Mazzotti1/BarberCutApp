

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native'

import { HeaderService } from '../components/Header/HeaderService'
import { NavContainer } from '../components/NavContainer'
import { api } from '../lib/axios';

export function VerifyCode(){

  const { navigate } = useNavigation()

  const [code, setCode] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const handleSubmit = async () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
        try {
      const savedEmail = await AsyncStorage.getItem('emailSaved');
      const  response =  await api.post('/verify-reset-code', {

        email:savedEmail,
        resetCode : code
      });
      navigate('resetpassword')
      Alert.alert("Código de recuperação correto, escolha sua senha nova");
    } catch (error) {
      Alert.alert("Código inválido");

    }
  };

 useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

    return(
        <View className='flex-1 '>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, }}
        className='flex-1  pt-11'
        style={{backgroundColor:'#030303',}}
        >
        <HeaderService />

        <View className='flex  items-center pt-20 '>
            <Text className='text-white mt-5 m-6 font-regular text-center text-2xl'>Digite o código que você recebeu no seu email</Text>


        <View  className='gap-5  mt-2 flex-row'>
         <View className='justify-center '>
         <TextInput
              className="text-white  font-regular text-center whitespace-nowrap text-2xl overflow-hidden"
              placeholder={'0-0-0-0-0-0'}
              placeholderTextColor="#8b8c8b"
              maxLength={6}
              onChangeText={setCode}
              >

              </TextInput>
           <View style={{height:1, backgroundColor:'white', width:250}}></View>
         </View>

       </View>
       <TouchableOpacity
          onPress={handleSubmit}
         className="w-32 h-10 mt-10 flex-row  bg-slate-200 items-center justify-center  border rounded-xl">
         <Text className='text-center font-regular text-xl'>Enviar</Text>
     </TouchableOpacity>
         <View style={{ marginTop: 10 }}>
            {timeLeft > 0 && (
              <Text style={{ color: 'white', fontSize: 18 }}>
                Código expira em: {minutesLeft}:{secondsLeft < 10 ? '0' : ''}{secondsLeft}
              </Text>
            )}
          </View>
       </View>

        </ScrollView>
           <NavContainer />
        </View>
    )
 }
