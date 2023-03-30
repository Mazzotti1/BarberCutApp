

import { Check } from 'phosphor-react-native';
import React, { useState } from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native'

import { HeaderService } from '../components/Header/HeaderService'
import { NavContainer } from '../components/NavContainer'
import { api } from '../lib/axios';

export function ForgotPassword(){

  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
        try {
      const  response =  await api.post('/forgot-password',{ email});


      Alert.alert("Código de recuperação foi enviado para o seu email");
      console.log(response.data);
    } catch (error) {
      console.error('Email inválido');
    }
  };


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
            <Text className='text-white mt-5 m-6 font-regular text-center text-2xl'>Digite seu email para recuperar a senha</Text>


        <View  className='gap-5  mt-2 flex-row'>
         <View className='justify-center '>
         <TextInput
              className="text-white  font-regular ml-2 text-base whitespace-nowrap text-ellipsis overflow-hidden"
              placeholder={'Email'}
              placeholderTextColor="#8b8c8b"
              maxLength={40}
              onChangeText={setEmail}
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
       </View>

        </ScrollView>
           <NavContainer />
        </View>
    )
 }
