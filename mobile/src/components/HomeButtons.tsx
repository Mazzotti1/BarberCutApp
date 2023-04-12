import { TouchableOpacity, View,Text } from "react-native";
import { Calendar,Scissors, UsersThree, MapPin } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';

export function HomeButtons() {
  const { navigate } = useNavigation()

  const handleOpenMaps = () => {
    const latitude = -22.90278;
    const longitude = -43.2075;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url);
  }

  return (
    <View className="flex-row gap-3 mt-1">
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

<TouchableOpacity
onPress={handleOpenMaps}
>
<View className=" rounded-full p-2">
<View className="bg-zinc-900 rounded-full p-2">
    <MapPin color="white" size={46}/>
    </View>

    <Text className="text-white text-base  text-center font-regular">Ver Mapa</Text>
</View>
</TouchableOpacity>
    </View>
  )
}