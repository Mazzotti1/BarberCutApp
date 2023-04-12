
import { View, TextInput} from 'react-native';
import {User} from 'phosphor-react-native'

interface Props {
    value: string;
    onChangeText: (value: string) => void;
  }
export function Name ({value, onChangeText}: Props){
    return(
        <View className="w-64 h-10 mt-6 flex-row bg-zinc-900  items-center pl-4 overflow-hidden border-white border rounded-full">
        <User   size={32} color="#ededed" weight="thin" />
        <TextInput
        className="text-white font-regular ml-2 text-base whitespace-nowrap text-ellipsis overflow-hidden "
        value={value}
        onChangeText={onChangeText}
        placeholder="Nome completo"
        placeholderTextColor="#d3d3d3"
        maxLength={30}
        ></TextInput>
    </View>
    )
}