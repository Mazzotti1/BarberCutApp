import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";

import {  useIsFocused  } from "@react-navigation/native";

import { useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Photo } from "../Profile/Photo";


interface SidebarProps {
  handleSidebar: () => void
}

export function Header({handleSidebar}:SidebarProps) {
  const [isLogged, setIsLogged] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    checkIsLogged();
  }, [isFocused]);

  const checkIsLogged = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

  };

  return (
    <SafeAreaView  className="w-screen h-16 mt-3 justify-center bg-black   ">



        {isLogged ? (
          <View className="flex-row items-center justify-between">
                <TouchableOpacity onPress={() => handleSidebar()} >
                    <View  className="bg-white w-7 h-1 ml-10 mb-1 rounded-md"></View>
                    <View  className="bg-white w-7 h-1 ml-10 mb-1 rounded-md"></View>
                    <View  className="bg-white w-7 h-1 ml-10 rounded-md"></View>
                </TouchableOpacity>

                <Text className="text-white   font-regular  text-2xl">
                  SHARP CUT
                </Text>

                   <Photo />

         </View>
         ):(
          <View className="items-center"><Text className="text-white font-regular  text-2xl"  >SHARP CUT</Text></View>
         )
      }

    </SafeAreaView >
  )
}

