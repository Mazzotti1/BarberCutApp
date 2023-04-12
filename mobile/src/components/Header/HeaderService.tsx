import { View, TouchableOpacity, Text } from "react-native";

import { useState, useEffect } from "react";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BackButton } from "../Utils/BackButton";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Photo } from "../Profile/Photo";

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
    <View className="w-screen h-16 justify-center mt-3 bg-black   ">

        {isLogged ? (
          <View className="flex-row items-center justify-between">
                <View className=" ml-6 ">
                 <BackButton  />
                </View>

                <Text className="text-white  font-regular  text-2xl">
                  SHARP CUT
                </Text>

                <Photo />
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






