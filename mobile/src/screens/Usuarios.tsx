
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native"

import { NavContainer } from "../components/NavContainer";

import { useEffect, useState, } from "react";

import { HeaderService } from "../components/Header/HeaderService";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../lib/axios";
import jwt_decode from 'jwt-decode'

interface DecodedToken {
    id: string;
    nome: string;
    userNumber:string;
    birth:string;
    email:string;
    cpf:string;
  }

  export function Usuarios(){

    const isFocused = useIsFocused();
    const [usuarios, setUsuarios] = useState<DecodedToken[]>([]);
    const [dadosUsuario, setDadosUsuario] = useState({ email: '',  cpf:'' , birth:'', });
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
      async function carregarUsuarios() {
        const token = await AsyncStorage.getItem('userToken');
        const decodeToken = jwt_decode(token ?? '') as DecodedToken
        const userId = decodeToken.id
        try {
          const response = await api.get('/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUsuarios(userData);
        } catch (error) {
          console.log('Erro na requisição:', error);
        }
      }
      carregarUsuarios();
    }, [isFocused]);
    async function carregarDadosUsuario(userId: string)  {
        try {
            const response = await api.get(`/users/${userId}`, {});
            setDadosUsuario(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    async function deletarUsuario(userId: string)  {
        try {
            Alert.alert(
                'Confirmação',
                'Tem certeza que deseja deletar este usuário?',
                [
                    {
                        text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'Confirmar',
                        onPress: async () => {
                            const response = await api.delete(`/users/${userId}`, {});
                            setUsuarios(usuarios.filter(user => user.id !== userId));
                            setDadosUsuario(response.data);
                        }
                    }
                ]
            );
        } catch (error) {
            console.log(error)
        }
    }

    async function promoverUsuario(userId: string) {
        try {
          Alert.alert(
            'Confirmação',
            'Tem certeza que deseja promover este usuário?',
            [
              {
                text: 'Cancelar',
                style: 'cancel'
              },
              {
                text: 'Confirmar',
                onPress: async () => {
                  const response = await api.patch(`/update/${userId}`, {
                    admin: true
                  });
                  setDadosUsuario(response.data);
                }
              }
            ]
          );
        } catch (error) {
          console.log(error);
        }
      }

    return(
        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100, }}
            className='flex-1 pt-11'
            style={{backgroundColor:'#030303',}}
          >
            <HeaderService />

            <View className=" flex-1 m-5 p-2 mt-6 ">
              {usuarios.map((user) => (
                <View key={user.id}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUserId(user.id);
                      carregarDadosUsuario(user.id);
                      setShowUserInfo(true);
                    }}
                    className="bg-zinc-900 border rounded-xl flex-row justify-between items-center mt-2 p-4"
                  >
                    <View>
                      <Text className="font-regular text-white text-lg">{user.nome}</Text>
                      <Text className="font-regular text-white text-md">{user.userNumber}</Text>
                    </View>
                    <View className="flex-row gap-4">
                      <TouchableOpacity
                       onPress={() => {
                        setSelectedUserId(user.id);
                        promoverUsuario(user.id)
                      }}
                      className="bg-green-700 w-18  border rounded-xl items-center p-2">
                          <Text className="text-white font-regular">Promover</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                         onPress={() => {
                            setSelectedUserId(user.id);
                            deletarUsuario(user.id)
                          }}
                      className="bg-red-800 w-16 border rounded-xl items-center p-2">
                          <Text className="text-white font-regular ">Deletar</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  {showUserInfo && selectedUserId === user.id &&
                    <View className="p-4 border border-stone-200 rounded-lg bg-zinc-300">
                      <Text className="text-black font-regular text-md">Email: {dadosUsuario.email}</Text>
                      <Text className="text-black font-regular text-md">CPF: {dadosUsuario.cpf}</Text>
                      <Text className="text-black font-regular text-md">Data de Nascimento: {dadosUsuario.birth}</Text>
                    </View>
                  }
                </View>
              ))}
            </View>
          </ScrollView>
        <NavContainer />
      </View>
    )
}
