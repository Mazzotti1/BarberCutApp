

  import React, { useState, useEffect } from 'react';
  import {View, Text, TextInput, TouchableOpacity} from 'react-native'


  import { HeaderService } from '../components/Header/HeaderService'


  import { User, Envelope, Phone, IdentificationCard, Calendar } from 'phosphor-react-native';

  import { api } from '../lib/axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import jwt_decode from 'jwt-decode'


  interface DecodedToken {
      id: string;
      name: string;
      email: string;
      userNumber:string;
      cpf:string;
      birth:string;
    }



  export function MyData(){
       const [usuario, setUsuario] = useState({ nome: '', email: '', userNumber:'', cpf:'' , birth:'', });



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


        const [nome, setNome] = useState(usuario.nome);
        const [email, setEmail] = useState(usuario.email);
        const [userNumber, setUserNumber] = useState(usuario.userNumber);
        const [cpf, setCpf] = useState(usuario.cpf);
        const [birth, setBirth] = useState(usuario.birth);


        const datas = [
          {
            title: usuario.nome,
            placeholder: 'Nome completo',
            icon: <User size={42} color="#ededed" weight="thin" />,
            onChangeText: setNome,
          },
          {
            title: usuario.email,
            placeholder: 'Email',
            icon: <Envelope size={42} color="#ededed" weight="thin" />,
            onChangeText: setEmail,
          },
          {
            title: usuario.userNumber,
            placeholder: 'Número de telefone',
            icon: <Phone size={42} color="#ededed" weight="thin" />,
            onChangeText: setUserNumber,
          },
          {
            title: usuario.cpf,
            placeholder: 'CPF',
            icon: <IdentificationCard size={42} color="#ededed" weight="thin" />,
            onChangeText: setCpf,
          },
          {
            title: usuario.birth,
            placeholder: 'Data de nascimento',
            icon: <Calendar size={42} color="#ededed" weight="thin" />,
            onChangeText: setBirth,
          },
        ];



        async function atualizarDados() {
          const token = await AsyncStorage.getItem('userToken');
          const decodeToken = jwt_decode(token ?? '') as DecodedToken;
          const userId = decodeToken.id;

          const dataToUpdate: any = {};

          if (nome && nome !== usuario.nome) {
            dataToUpdate.nome = nome;
          }
          if (email && email !== usuario.email) {
            dataToUpdate.email = email;
          }
          if (userNumber && userNumber !== usuario.userNumber) {
            dataToUpdate.userNumber = userNumber;
          }
          if (cpf && cpf !== usuario.cpf) {
            dataToUpdate.cpf = cpf;
          }
          if (birth && birth !== usuario.birth) {
            dataToUpdate.birth = birth;
          }

          try {
            const response = await api.patch(`/update/${userId}`, dataToUpdate, {

            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }




      return(
          <View className='flex-1 pt-11'style={{backgroundColor:'#030303',}}>

          <HeaderService />
              <View className='m-6'>
                <Text className='text-slate-200 font-regular text-2xl'>Meus Dados</Text>
              </View>


              {datas.map((data, index) => (
       <View key={index} className='gap-5 ml-1 mt-2 flex-row'>
         {data.icon}
         <View className='justify-center'>
         <TextInput
              className="text-white font-regular ml-2 text-base whitespace-nowrap text-ellipsis overflow-hidden"
              placeholder={data.placeholder}
              placeholderTextColor="#d3d3d3"
              maxLength={30}
              onChangeText={data.onChangeText}
              >
               {data.title ? data.title.charAt(0).toUpperCase() + data.title.slice(1) : ''}
              </TextInput>
           <View style={{height:1, backgroundColor:'white', width:250}}></View>
         </View>
       </View>
     ))}

     <TouchableOpacity
    onPress={atualizarDados}
     className="w-32 h-10 mt-10 flex-row  bg-slate-200 items-center justify-center ml-32  border rounded-xl">
         <Text className='text-center font-regular text-xl'>Salvar dados</Text>
     </TouchableOpacity>

   </View>
     )
 }