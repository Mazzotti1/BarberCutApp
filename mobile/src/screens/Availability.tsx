import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import { HeaderService } from "../components/Header/HeaderService";

import ScheduleCalendar from "../components/Schedule/ScheduleCalendar";

import { api } from "../lib/axios";

import Barber1 from '../assets/barber1.svg'
import Barber2 from '../assets/barber2.svg'

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Barber {
  id: string;
  name: string;
}

export default function Availability (){
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    async function loadBarbers() {
      const response = await api.get('/barbers');
      setBarbers(response.data.barbers);
    }
    loadBarbers();
  }, []);

  const barbersList = [
    {
      id: barbers[0]?.id,
      name: barbers[0]?.name,
      img: <Barber1 style={{width:10}} />
    },
    {
      id: barbers[1]?.id,
      name: barbers[1]?.name,
      img: <Barber2 />
    },

  ];

  useEffect(() => {
    async function loadSelectedBarber() {
      const Barbervalue = await AsyncStorage.getItem('selectedBarber');
      setSelectedBarberId(Barbervalue ? Barbervalue : '');
    }

    loadSelectedBarber();
  }, []);


  async function getAvailability() {
    const id = await AsyncStorage.getItem('selectedBarberId');
    const date = await AsyncStorage.getItem('selectedDate');
    const response = await api.get('/availability', {
      params: {
        id,
        date,
      },
    });

    const times = response.data.times;
    setTimes(times);

  }





    return(
        <View className='flex-1'>
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, }}
          className='flex-1 pt-11'
          style={{backgroundColor:'#030303',}}
          >
          <HeaderService />

          {barbersList.map(function(item, index){
            if (item.id === selectedBarberId) {
            return(
              <>
                <View  key={index} className={` w-screen bg-zinc-500 mt-4 ${
                          item.id === selectedBarberId ? 'w-screen bg-white mt-4' : null
                        }`}
                        style={{height:1}}></View>

                <View className="flex-row mt-7">
                  <View className="flex-col items-center ml-4">
                    <Text className={`${
                          item.id === selectedBarberId ? 'border-2 border-white rounded-xl' : null
                        }`}>{item.img}</Text>

                    <Text className={`text-white mt-5 w-20 text-center font-regular text-lg ${
                          item.id === selectedBarberId ? 'text-white' : null
                        }`}>{item.name}</Text>
                  </View>
                  <View className="ml-10">
                    <Text className={`text-white  w-20 text-center font-regular text-lg ${
                          item.id === selectedBarberId ? 'text-white' : null
                        }`}>Detalhes:</Text>

                    <Text className="text-white font-regular text-lg">Alisamento</Text>
                    <Text className="text-white font-regular text-lg">21/03/2023</Text>
                  </View>
                </View>
                <View className={` w-screen bg-zinc-500 mt-4 ${
                          item.id === selectedBarberId ? 'w-screen bg-white mt-4' : null
                        }`} style={{height:1}}></View>

                  {times.map((time) => (
                    <View key={time} className="border border-white w-20 h-10 mt-4 ml-12 rounded-lg justify-center">
                      <Text className="text-white text-center">{time}</Text>
                    </View>
                  ))}


                <View className={` w-screen bg-zinc-500 mt-4 ${
                          item.id === selectedBarberId ? 'w-screen bg-white mt-4' : null
                        }`} style={{height:1}}></View>
              </>
            )
          }})}

            </ScrollView>
        </View>
    )
}