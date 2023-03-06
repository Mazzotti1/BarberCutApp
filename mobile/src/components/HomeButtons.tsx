import { TouchableOpacity, View,Text } from "react-native";

import { Calendar,Scissors, UsersThree, MapPin } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native";


export function HomeButtons() {
  const { navigate } = useNavigation()

  return (
    <TouchableOpacity className="flex-row gap-3 mt-1"
    //   activeOpacity={0.7}
    //   onPress={}
    >
<TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('schedule')
               }}>
 <View className=" rounded-full p-2">
    <View className="bg-zinc-900 rounded-full p-2">
     <Calendar color="white" size={46}/>
    </View>

      <Text className="text-white text-center text-base font-regular">Agendar</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('services')
               }}>
<View className=" rounded-full p-2">
    <View className="bg-zinc-900 rounded-full p-2">
    <Scissors  color="white" size={46}/>
    </View>

    <Text className="text-white text-base  text-center font-regular">Serviços</Text>
</View>
</TouchableOpacity>

<TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                navigate('barbers')
               }}>
<View className=" rounded-full p-2">
<View className="bg-zinc-900 rounded-full p-2">
    <UsersThree color="white"  size={46}/>
    </View>
    <Text className="text-white text-base  text-center font-regular">Equipe</Text>
</View>
</TouchableOpacity>

<View className=" rounded-full p-2">
<View className="bg-zinc-900 rounded-full p-2">
    <MapPin color="white" size={46}/>
    </View>

    <Text className="text-white text-base  text-center font-regular">Ver Mapa</Text>
</View>




    </TouchableOpacity>
  )
}