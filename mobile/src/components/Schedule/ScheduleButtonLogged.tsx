import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";


export function ScheduleButtonLogged () {
    const { navigate } = useNavigation()

    return(
        <TouchableOpacity
        onPress={()=>{
            navigate('availability')
           }}
        className='flex items-center'>
        <View className='flex items-center w-40 p-3 bg-zinc-800 rounded-xl mb-10'>
          <Text className='font-regular text-slate-300 text-xl'>Buscar horários</Text>
        </View>
      </TouchableOpacity>
    )
}