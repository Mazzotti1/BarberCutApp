
import { View, TextInput} from 'react-native';
import {Envelope, } from 'phosphor-react-native'
interface Props {
    value: string;
    onChangeText: (value: string) => void;
  }
export function Email ({value, onChangeText}: Props){

    return(
        <View className="w-64 h-10 mt-6 flex-row bg-zinc-900 overflow-hidden items-center pl-4  border-white border rounded-full">
                    <Envelope   size={32} color="#ededed" weight="thin" />
                    <TextInput
                    className="text-white font-regular mr-2 ml-2 whitespace-nowrap text-ellipsis overflow-hidden  text-base"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="E-mail"
                    placeholderTextColor="#d3d3d3"
                    maxLength={40}
                    ></TextInput>
        </View>
    )
}