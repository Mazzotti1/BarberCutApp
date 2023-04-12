

  import React, { useState, useEffect } from 'react';
  import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'

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
            maxLenght: 30,
            minLenght: 3,
          },
          {
            title: usuario.email,
            placeholder: 'Email',
            icon: <Envelope size={42} color="#ededed" weight="thin" />,
            onChangeText: setEmail,
            maxLenght: 40,
            minLenght: 13,
          },
          {
            title: usuario.userNumber,
            placeholder: 'Número de telefone',
            icon: <Phone size={42} color="#ededed" weight="thin" />,
            onChangeText: setUserNumber,
            maxLenght: 11,
            minLenght: 11,
          },
          {
            title: usuario.cpf,
            placeholder: 'CPF (000.000.000-00)',
            icon: <IdentificationCard size={42} color="#ededed" weight="thin" />,
            onChangeText: setCpf,
            maxLenght: 14,
            minLenght: 11,
          },
          {
            title: usuario.birth,
            placeholder: 'Data de nascimento (dia/mes/ano)',
            icon: <Calendar size={42} color="#ededed" weight="thin" />,
            onChangeText: setBirth,
            maxLenght: 10,
            minLenght: 8,
          },
        ];

        async function atualizarDados() {
          const token = await AsyncStorage.getItem('userToken');
          const decodeToken = jwt_decode(token ?? '') as DecodedToken;
          const userId = decodeToken.id;

          const dataToUpdate: any = {};

          if (nome && nome !== usuario.nome && nome.length > 3) {
            dataToUpdate.nome = nome;
          } else if (nome && nome.length < 3) {
            Alert.alert("O nome deve ter pelo menos 3 caracteres.");
            return;
          }
          if (email && email !== usuario.email && email.length > 13) {
            dataToUpdate.email = email;
          } else if (email && email.length < 13) {
            Alert.alert("O Email é inválido!");
            return;
          }
          if (userNumber && userNumber !== usuario.userNumber && userNumber.length > 11) {
            dataToUpdate.userNumber = userNumber;
          } else if (userNumber && userNumber.length < 11) {
            Alert.alert("O Número de telefone é inválido!");
            return;
          }
          if (cpf && cpf !== usuario.cpf && cpf.length > 11 ) {
            dataToUpdate.cpf = cpf;
          } else if (cpf && cpf.length < 11) {
            Alert.alert("O cpf é inválido!");
            return;
          }
          if (birth && birth !== usuario.birth && birth.length > 8) {
            dataToUpdate.birth = birth;
          } else if (birth && birth.length < 8) {
            Alert.alert("A data de nascimento é inválido!");
            return;
          }

          try {
            const response = await api.patch(`/update/${userId}`, dataToUpdate, {

            });

            Alert.alert("Dados atualizados com sucesso!")
          } catch (error) {
            Alert.alert("Novos dados escritos são inválidos, verifique e tente salvar novamente!")
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
              placeholderTextColor="#8b8c8b"
              maxLength={data.maxLenght}

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