import { useState } from "react";

import { View, TextInput, TouchableOpacity} from 'react-native';
import {Eye, Lock } from 'phosphor-react-native'

interface Props {
    value: string;
    onChangeText: (value: string) => void;
  }

export function Password ({value, onChangeText}: Props){
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    return(
      <View className="flex-row items-center  ">
        <View className="w-64 h-10 mt-6 ml-10 flex-row bg-zinc-900 overflow-hidden items-center pl-4  border-white border rounded-full">
        <Lock   size={32} color="#ededed" weight="thin" />
        <TextInput
        className="text-white font-regular mr-2 ml-2 whitespace-nowrap text-ellipsis overflow-hidden  text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder="Senha"
        placeholderTextColor="#d3d3d3"
        secureTextEntry={!showPassword}

        ></TextInput>

    </View>
    <TouchableOpacity className="mt-6 ml-2" onPress={toggleShowPassword}>
            <Eye size={32} color="#ededed" weight="thin" />
        </TouchableOpacity>
    </View>
    )
}