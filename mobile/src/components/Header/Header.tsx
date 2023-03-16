import { View, TouchableOpacity, Text, Animated, TouchableWithoutFeedback, StyleSheet } from "react-native";

import { useNavigation, useIsFocused  } from "@react-navigation/native";

import { useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from 'phosphor-react-native'


interface SidebarProps {
  handleSidebar: () => void
}

export function Header({handleSidebar}:SidebarProps) {

  const navigation = useNavigation();

  const [isLogged, setIsLogged] = useState(false);
  const isFocused = useIsFocused();

  const [openSidebar, setOpenSidebar] = useState(false);
  const translateX = useRef(new Animated.Value(-400)).current;


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
    <View className="w-screen h-16 justify-center bg-black   ">



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

                <TouchableOpacity  className=" ">
                  <View  className="bg-slate-300 w-10 h-10 border rounded-full justify-center items-center mr-10">
                     <User size={27} color="#0b0b0b" weight="thin" />
                  </View>
                </TouchableOpacity>



         </View>
         ):(
          <View className="items-center"><Text className="text-white font-regular  text-2xl"  >SHARP CUT</Text></View>
         )
      }

    </View>
  )
}

