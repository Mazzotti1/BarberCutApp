

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {  Eye } from 'phosphor-react-native';
import React, {  useState } from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native'

import { HeaderService } from '../components/Header/HeaderService'
import { NavContainer } from '../components/NavContainer'
import { api } from '../lib/axios';

export function ResetPassword(){

  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { navigate } = useNavigation()

  const handleSubmit = async () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
     if (password.length < 6) {
        Alert.alert('Senha inválida', 'A senha deve ter pelo menos 6 caracteres');
        return;
      }
        try {
      const savedEmail = await AsyncStorage.getItem('emailSaved');
      const  response =  await api.post('/reset-password', {

        email:savedEmail,
        password:password
      });
      navigate('login')
      Alert.alert("Sua senha foi redefinida com sucesso!");
      await AsyncStorage.removeItem('emailSaved');
    } catch (error) {
      Alert.alert("Senha inválida");

    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <Text className='text-white mt-5 m-6 font-regular text-center text-2xl'>Digite sua nova senha</Text>


        <View  className='gap-5  mt-2 flex-row'>
         <View className='justify-center '>
         <TextInput
              className="text-white  font-regular  whitespace-nowrap text-xl overflow-hidden"
              placeholder={'Nova senha'}
              placeholderTextColor="#8b8c8b"
              maxLength={100}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              >
              </TextInput>

           <View style={{height:1, backgroundColor:'white', width:250}}></View>
         </View>

         <TouchableOpacity onPress={toggleShowPassword}>
            <Eye size={32} color="#ededed" weight="thin" />
        </TouchableOpacity>

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
