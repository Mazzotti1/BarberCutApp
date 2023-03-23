

 import React, { useState, useEffect } from 'react';
 import {View, Text, TextInput, TouchableOpacity} from 'react-native'


 import { HeaderService } from '../components/Header/HeaderService'



 import { api } from '../lib/axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import jwt_decode from 'jwt-decode'


 interface DecodedToken {
     id: string;
     name: string;
     email: string;
     userNumber:string;
     cpf:string;
     birthDate:string;
   }



 export function Address(){
      const [usuario, setUsuario] = useState({ nome: '', email: '', userNumber:'', cpf:'' , birthDate:'', });
     useEffect(() => {


         async function carregarUsuario() {
           const token = await AsyncStorage.getItem('userToken');
           const decodeToken = jwt_decode(token ?? '') as DecodedToken
           const userId = decodeToken.id
           try {
             const response = await api.get(`/users/${userId}`, {
               headers: {
                 Authorization: `Bearer ${token}`
               }
             });

             setUsuario(response.data);
           } catch (error) {

           }

         }
         carregarUsuario()
       }, []);

       const datas = [
        { title: '', placeholder:'CEP', },
        { title: '', placeholder:'Rua',},
        { title: '', placeholder:'Bairro', },
        { title: '', placeholder:'Número',},
        { title: '', placeholder:'Complemento',},
      ];

     return(
         <View className='flex-1 pt-11'style={{backgroundColor:'#030303',}}>

         <HeaderService />
             <View className='m-6'>
               <Text className='text-slate-200 font-regular text-2xl'>Endereço</Text>
             </View>


             {datas.map((data, index) => (
      <View key={index} className='gap-5 ml-3 mt-2 flex-row'>

        <View className='justify-center'>
          <TextInput
            className="text-slate-400 font-regular ml-2 text-base whitespace-nowrap text-ellipsis overflow-hidden"
            placeholder={data.placeholder}
            placeholderTextColor="#696b6a"
            maxLength={30}
          >
            {data.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : ''}
          </TextInput>
          <View style={{height:1, backgroundColor:'white', width:320}}></View>
        </View>
      </View>
    ))}

    <TouchableOpacity className="w-36 h-10 mt-10 flex-row  bg-slate-200 items-center justify-center ml-32  border rounded-xl">
        <Text className='text-center font-regular text-xl'>Salvar endereço</Text>
    </TouchableOpacity>

  </View>
    )
 }