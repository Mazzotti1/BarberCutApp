

 import React, { useState, useEffect } from 'react';
 import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'


 import { HeaderService } from '../components/Header/HeaderService'



 import { api } from '../lib/axios';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import jwt_decode from 'jwt-decode'


 interface DecodedToken {
     id: string;
     cep: string;
     rua: string;
     bairro:string;
     numero:string;
     complemento:string;
   }



 export function Address(){
      const [usuario, setUsuario] = useState({ cep: '', rua: '', bairro:'', numero:'' , complemento:'', });

      const [cep, setCep] = useState(usuario.cep);
      const [rua, setRua] = useState(usuario.rua);
      const [bairro, setBairro] = useState(usuario.bairro);
      const [numero, setNumero] = useState(usuario.numero);
      const [complemento, setComplemento] = useState(usuario.complemento);

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
        { title: usuario.cep, placeholder:'CEP', onChangeText: setCep, maxLenght: 8, minLenght: 8,},
        { title: usuario.rua, placeholder:'Rua', onChangeText: setRua,maxLenght: 30, minLenght: 5,},
        { title: usuario.bairro, placeholder:'Bairro', onChangeText: setBairro, maxLenght: 30, minLenght: 5,},
        { title: usuario.numero, placeholder:'Número', onChangeText: setNumero,maxLenght: 6, minLenght: 1,},
        { title: usuario.complemento, placeholder:'Complemento', onChangeText: setComplemento, maxLenght: 25, minLenght: 5,},
      ];

      async function atualizarDados() {
        const token = await AsyncStorage.getItem('userToken');
        const decodeToken = jwt_decode(token ?? '') as DecodedToken;
        const userId = decodeToken.id;

        const dataToUpdate: any = {};



        if (cep && cep !== usuario.cep && cep.length >= 8) {
          dataToUpdate.cep = cep;
        } else if (cep && cep.length < 8) {
          Alert.alert("O cep é inválido!");
          return;
        }
        if (rua && rua !== usuario.rua && rua.length > 5) {
          dataToUpdate.rua = rua;
        } else if (rua && rua.length < 8) {
          Alert.alert("A rua é inválida!");
          return;
        }
        if (bairro && bairro !== usuario.bairro && bairro.length > 5) {
          dataToUpdate.bairro = bairro;
        } else if (bairro && bairro.length < 8) {
          Alert.alert("O bairro é inválido!");
          return;
        }

        if (numero && numero !== usuario.numero && numero.length > 1) {
          dataToUpdate.numero = numero;
        } else if (numero && numero.length < 8) {
          Alert.alert("O numero é inválido!");
          return;
        }
        if (complemento && complemento !== usuario.complemento) {
          dataToUpdate.complemento = complemento;

        }

        try {
          const response = await api.patch(`/update/${userId}`, dataToUpdate, {

          });

          Alert.alert("Endereço atualizado com sucesso!")

        } catch (error) {
          console.error(error);
        }
      }

     return(
         <View className='flex-1 pt-11'style={{backgroundColor:'#030303',}}>

         <HeaderService />
             <View className='m-6'>
               <Text className='text-slate-200 font-regular text-2xl'>Endereço</Text>
             </View>


             {datas.map((data, index) => (
      <View  key={index} className='gap-5 ml-1 mt-2 flex-row'>

        <View className='justify-center'>
          <TextInput
            className="text-white font-regular ml-2 text-base whitespace-nowrap text-ellipsis overflow-hidden"
            placeholder={data.placeholder}
            placeholderTextColor="#8b8c8b"
            maxLength={data.maxLenght}
            onChangeText={data.onChangeText}
          >
            {data.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : ''}
          </TextInput>
          <View style={{height:1, backgroundColor:'white', width:320}}></View>
        </View>
      </View>
    ))}

    <View className='items-center'>
    <TouchableOpacity
     onPress={atualizarDados}
    className="w-36 h-10 mt-10 flex-row  bg-slate-200 items-center justify-center border rounded-xl">
        <Text className='text-center font-regular text-xl'>Salvar endereço</Text>
    </TouchableOpacity>
    </View>
  </View>
    )
 }