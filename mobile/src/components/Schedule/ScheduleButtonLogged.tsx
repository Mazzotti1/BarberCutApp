import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";


export function ScheduleButtonLogged () {
    const { navigate } = useNavigation()
    const [disabled, setDisabled] = useState(false);

    async function handlePress() {
      if (disabled) {
        return;
      }
      const selectedService = await AsyncStorage.getItem('selectedService');
      const selectedDate = await AsyncStorage.getItem('selectedDate');
      const selectedBarber = await AsyncStorage.getItem('selectedBarber');

      if (!selectedService || !selectedDate || !selectedBarber) {
        Alert.alert('Ops', 'Por favor, verifique se você selecionou suas preferências');
        return;
      }

        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 5000);

      navigate('availability');
    }
    return(
        <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        className='flex items-center'>
        <View className='flex items-center w-40 p-3 bg-zinc-800 rounded-xl mb-10'>
          <Text className='font-regular text-slate-300 text-xl'>Buscar horários</Text>
        </View>
      </TouchableOpacity>
    )
}