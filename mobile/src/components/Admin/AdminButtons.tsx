import { TouchableOpacity, View,Text } from "react-native";

import { Calendar,Scissors, UsersThree, MapPin, UserList, UserGear, UserPlus, BookOpen } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';

export function AdminButtons() {
  const { navigate } = useNavigation()



  return (
    <TouchableOpacity className="flex-row gap-3 mt-1"

    >
<TouchableOpacity
               activeOpacity={0.5}
               onPress={()=> navigate('usuarios')}
>
 <View className=" rounded-full p-2">
    <View className="bg-zinc-900 rounded-full p-2">
     <UserList color="white" size={46}/>
    </View>

      <Text className="text-white text-center text-base font-regular">Usuários</Text>
</View>
</TouchableOpacity>

<TouchableOpacity

     onPress={()=> navigate('adminbarbers')}
    activeOpacity={0.5}>
<View className=" rounded-full p-2">
    <View className="bg-zinc-900 rounded-full p-2">
    <UserGear  color="white" size={46}/>
    </View>

    <Text className="text-white text-base  text-center font-regular">Barbeiros</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
               activeOpacity={0.5}>
<View className=" rounded-full p-2">
<View className="bg-zinc-900 rounded-full p-2">
    <UserPlus color="white"  size={46}/>
    </View>
    <Text className="text-white text-base  text-center font-regular">Admins</Text>
</View>
</TouchableOpacity>

<TouchableOpacity

>
<View className=" rounded-full p-2">
<View className="bg-zinc-900 rounded-full p-2">
    <BookOpen color="white" size={46}/>
    </View>

    <Text className="text-white text-base  text-center font-regular">Diário</Text>
</View>
</TouchableOpacity>


    </TouchableOpacity>
  )
}