import { View, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import {House, Calendar, BookBookmark, Newspaper } from 'phosphor-react-native'


export function NavContainer() {
  const { navigate } = useNavigation()
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

      <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('schedule')
               }}>
      <Newspaper size={48} color="#ededed" weight="thin" />
      </TouchableOpacity>
    </View>
  )
}