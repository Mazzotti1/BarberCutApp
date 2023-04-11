
import { View, ScrollView, Text, TouchableOpacity, Alert, SafeAreaView, TextInput, Keyboard } from "react-native"

import { NavContainer } from "../components/NavContainer";

import { useEffect, useState, } from "react";

import { HeaderService } from "../components/Header/HeaderService";
import { useIsFocused } from "@react-navigation/native";


import { api } from "../lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScheduleCalendar from "../components/Schedule/ScheduleCalendar";
import { XCircle } from "phosphor-react-native";

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

    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    const [selectedTime, setSelectedTime] = useState('');

    const [value, setValue] = useState('');

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


     async function loadAvailability(barberId: string) {
      try {
        const response = await api.get(`/barbers/${barberId}/horarios`);
        const data = response.data;
        setAvailableTimes(data);
      } catch (error) {
        console.log(error)
      }
    }


      async function chooseAvailability(barberId: string, value:string) {
  const isValidFormat = /^([0-1][0-9]|[2][0-3]):[0-5][0-9]$/.test(value);

  if (!isValidFormat) {
    alert('Por favor, insira um horário válido no formato hora:minuto');
    return;
  }

      try {
        const response = await api.post(`/barbers/${barberId}/horarios`, {
          horariosDisponiveis: [value],

        });
        const newAvailableTimes = [...availableTimes, value];
        setAvailableTimes(newAvailableTimes);

        alert('Horário salvo com sucesso!');
        setValue('')
      } catch (error) {
        console.log(error)
      }
    }
    function onChangeText(text: string) {

        setValue(text);

    }

    async function deleteAvailability(barberId: string, horario:string)  {
      try {
       const response = await api.delete(`/barbers/${barberId}/horarios/${horario}`, {});
       const updatedAvailableTimes = availableTimes.filter(time => time !== horario);
       setAvailableTimes(updatedAvailableTimes);
       }
         catch (error) {
          console.log(error)
      }
  }
  const handleDeleteTime = (horario:string, barberId:string) => {
    deleteAvailability(barberId, horario);
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
                      loadAvailability(barber.id);
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

                    </SafeAreaView>

                    <ScrollView
                    horizontal={true}
                    className="mb-8"
                    >
                  {availableTimes.map((time, index) => (
                    <View className="items-center ml-6">
                     <TouchableOpacity

                     key={time}
                     className={`border border-white w-20 h-10 mt-4 mb-4  rounded-lg justify-center ${time ? 'bg-zinc-200' : ''}`}
                     onPress={() => {
                       setSelectedTime(time);

                     }}
                   >
                     <Text className={`text-white text-center ${time ? 'text-black' : ''}`}>{time}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                  onPress={() => handleDeleteTime(time, barber.id)}>

                      <XCircle size={30} color="#ededed" weight="thin" />
                    </TouchableOpacity>
                   </View>
                  ))}
                </ScrollView>
                <View className="items-center">
                       <View className="w-64 h-10  mb-4 flex-row bg-zinc-900 overflow-hidden items-center pl-4  border-white border rounded-xl">

                        <TextInput
                        className="text-white font-regular mr-2 ml-2 whitespace-nowrap text-ellipsis overflow-hidden  text-base"
                        value={value}
                         onChangeText={onChangeText}
                        placeholder="Digite qual o seu horário disponivel"
                        placeholderTextColor="#d3d3d3"
                        keyboardType="default"
                        maxLength={5}
                        ></TextInput>


                    </View>
                    <TouchableOpacity
                        className="border border-white w-24 h-12 pl-2 pr-2 mb-3 rounded-lg justify-center"
                        onPress={() => {
                          chooseAvailability(barber.id, value);
                          Keyboard.dismiss();
                        }}>
                          <Text className="text-white text-center">Salvar horario</Text>
                          </TouchableOpacity>
                </View>


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
