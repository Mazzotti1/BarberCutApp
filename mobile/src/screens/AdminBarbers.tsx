
import { View, ScrollView, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native"

import { NavContainer } from "../components/NavContainer";

import { useEffect, useState, } from "react";

import { HeaderService } from "../components/Header/HeaderService";
import { useIsFocused } from "@react-navigation/native";


import { api } from "../lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScheduleCalendar from "../components/Schedule/ScheduleCalendar";

interface Barber {
    id: string;
    name: string;
  }


  interface Time {
    isAvailable: boolean;
    time: string;
  }

  export function AdminBarbers(){

    const isFocused = useIsFocused();
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [selectedBarberId, setSelectedBarberId] = useState('');

    const [availableTimes, setAvailableTimes] = useState<Time[]>([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        async function carregarBarbeiros() {
            try {
              const response = await api.get('/barbers');
              setBarbers(response.data.barbers);
            } catch (error) {
              console.log('Erro na requisição:', error);
            }
          }

          carregarBarbeiros()
    }, [isFocused]);

     async function deletarBarbeiro(barberId: string)  {
         try {
             Alert.alert(
                 'Confirmação',
                 'Tem certeza que deseja deletar este barbeiro?',
                 [
                     {
                         text: 'Cancelar', style: 'cancel'},
                     {
                         text: 'Confirmar',
                         onPress: async () => {
                            const response = await api.delete(`/barbers/${barberId}`, {});
                            setBarbers(barbers.filter(barber => barber.id !== barberId));
                         }
                     }
                 ]
             );
         } catch (error) {
             console.log(error)
         }
     }


        async function loadAvailability() {
          const id = await AsyncStorage.getItem('selectedBarber');
          const date = await AsyncStorage.getItem('selectedDate');
          try {
            const response = await api.get(`/availability?id=${id}&date=${date}`);
            const data = response.data;
            setAvailableTimes(data.availability);
          } catch (error) {

          }
        }





    return(
        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100, }}
            className='flex-1 pt-11'
            style={{backgroundColor:'#030303',}}
          >
            <HeaderService />

            <View className=" flex-1 m-5 p-2 mt-6 ">
              {barbers.map((barber) => (
                <View key={barber.id}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBarberId(barber.id);
                      setShowUserInfo(true);
                      loadAvailability()
                    }}
                    className="bg-zinc-900 border rounded-xl flex-row justify-between items-center mt-2 p-4"
                  >
                    <View>
                      <Text className="font-regular text-white text-lg">{barber.name}</Text>
                      <Text className="font-regular text-white text-md">ID: {barber.id}</Text>
                    </View>
                    <View className="flex-row gap-4">
                      <TouchableOpacity
                         onPress={() => {
                            setSelectedBarberId(barber.id);
                            deletarBarbeiro(barber.id)
                          }}
                      className="bg-red-800 w-16 border rounded-xl items-center p-2">
                          <Text className="text-white font-regular ">Deletar</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  {showUserInfo && selectedBarberId === barber.id &&
                    <View className="  border border-stone-200 rounded-lg bg-zinc-900">
                      <Text className="text-white font-regular text-md text-center mt-5">Escolha o DIA e os HORARIOS disponiveis para você:</Text>
                      <SafeAreaView className='flex-1'>
                      <ScheduleCalendar />
                    </SafeAreaView>

                    <ScrollView
                    horizontal={true}
                    className="mb-8"
                    >
                  {availableTimes.map(time => (
                     <TouchableOpacity
                     key={time.time}
                     className={`border border-white w-20 h-10 mt-4 ml-6 rounded-lg justify-center ${time.isAvailable ? 'bg-zinc-200' : ''}`}
                     onPress={() => {
                       setSelectedTime(time.time);

                     }}
                   >
                     <Text className={`text-white text-center ${time.isAvailable ? 'text-black' : ''}`}>{time.time}</Text>
                   </TouchableOpacity>
                  ))}
                </ScrollView>

                    </View>
                  }
                </View>
              ))}
            </View>
          </ScrollView>
        <NavContainer />
      </View>
    )
}
