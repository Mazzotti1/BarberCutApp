import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {House, Calendar, BookBookmark, Question, ShieldWarning } from 'phosphor-react-native'
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode'
import { api } from "../lib/axios";
import { useIsFocused } from '@react-navigation/native';

interface DecodedToken {
  id: string;
 admin:boolean;
}

export function NavContainer() {
  const { navigate } = useNavigation()

  const [isAdmin, setIsAdmin] = useState(false);
  const [usuario, setUsuario] = useState({ id:'', admin:{}, });
  const isFocused = useIsFocused();

  useEffect(() => {
    async function carregarUsuario() {
      const token = await AsyncStorage.getItem('userToken');
      if (token) { // Verifica se existe um token
        const decodeToken = jwt_decode(token) as DecodedToken;
        const userId = decodeToken.id;
        try {
          const response = await api.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const userData = response.data;
          setUsuario(userData);
          const isAdm = userData.admin;
          setIsAdmin(isAdm);

        } catch (error) {
          console.log(error)
        }
      }
    }

    carregarUsuario()
  }, [isFocused]);


  return (
    <View className=" w-screen h-16 flex-row items-center justify-between p-5 " style={{backgroundColor:'#0a0a0a', bottom:0 }}>
         <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('home')
               }}>
      <House size={48} color="#ededed" weight="thin" />
         </TouchableOpacity>

      <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('schedule')
               }}>
      <Calendar size={48} color="#ededed" weight="thin" />
      </TouchableOpacity>

      <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('myschedule')
               }}>
      <BookBookmark size={48} color="#ededed" weight="thin" />
      </TouchableOpacity>

      {isAdmin ? (
           <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('admin')
               }}>
            <ShieldWarning size={48} color="#ededed" weight="thin" />
            </TouchableOpacity>
        ):(
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={()=>{
            navigate('faq')
            }}>
            <Question size={48} color="#ededed" weight="thin" />
            </TouchableOpacity>
            )}

    </View>
  )
}