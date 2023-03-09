import { View, TouchableOpacity, Text } from "react-native";

import { useState, useEffect } from "react";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BackButton } from "../Utils/BackButton";

import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from 'phosphor-react-native'

export function HeaderService() {
  const { navigate } = useNavigation()
  const [isLogged, setIsLogged] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {

    checkIsLogged();
  }, [isFocused]);

  const checkIsLogged = async () => {

    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setIsLogged(true);
    }
  };



  return (
    <View className="w-screen h-16 justify-center bg-black   ">

        {isLogged ? (
          <View className="flex-row items-center justify-between">
                <View className=" ml-6 ">
                 <BackButton  />
                </View>

                <Text className="text-white  font-regular  text-2xl">
                  SHARP CUT
                </Text>

                <View className=" ">
                  <View  className="bg-slate-300 w-10 h-10 border rounded-full justify-center items-center mr-10">
                     <User size={27} color="#0b0b0b" weight="thin" />
                  </View>
                </View>
         </View>
         ):(

          <View className="flex-row items-center justify-between">
            <View className=" ml-6 ">
                 <BackButton  />
                </View>

                <Text className="text-white  font-regular  text-2xl">SHARP CUT</Text>

                <View className=" ">
                  <View  className=" mr-10">

                  </View>
                </View>

          </View>
         )

         }


    </View>
  )
}






