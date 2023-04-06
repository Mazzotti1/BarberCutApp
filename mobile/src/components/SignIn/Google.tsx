import { GoogleLogo } from "phosphor-react-native";
import { View, Text } from "react-native";


export function Google(){




    return(
        <View className='items-center flex-row p-2 w-fit rounded-xl mt-4 bg-slate-600'>
        <GoogleLogo size={32} color="#ededed" weight="thin" />
        <Text className='font-regular text-gray-300 text-xl '>Continuar com Google</Text>
        </View>
    )
}