import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

import { HeaderService } from "../components/Header/HeaderService";

import ScheduleCalendar from "../components/Schedule/ScheduleCalendar";

import { api } from "../lib/axios";

import Barber1 from '../assets/barber1.svg'
import Barber2 from '../assets/barber2.svg'

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import ScheduleConfirmation from "../components/Schedule/ScheduleConfirmation";

interface Barber {
  id: string;
  name: string;
}

interface Time {
  time: string;
}

export default function Availability (){
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [availableTimes, setAvailableTimes] = useState<Time[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');

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


  useEffect(() => {
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
    loadAvailability();
  }, []);

  async function SelectTime(time: string) {
    setSelectedTime(time);
    await AsyncStorage.setItem('selectedTime', time);

  }

  useEffect(() => {
    async function imprimirData() {
      const data = await AsyncStorage.getItem('selectedDate');
      if (data) {
        const dateObj = new Date(data);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear().toString();
        setSelectedDate(`${day}/${month}/${year}`);
      }
    }
    imprimirData();
  }, []);

  useEffect(() => {
    async function imprimirService() {
      const data = await AsyncStorage.getItem('selectedService');
      setSelectedService(data ?? '');

      }
    imprimirService();


  }, []);


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

              <React.Fragment key={item.id}>
                <View   className= 'w-screen bg-zinc-500 mt-4'
                        style={{height:1}}></View>

                <View className="flex-row mt-7">
                  <View className="flex-col items-center ml-4">
                    <Text className='border-2 border-white rounded-xl' >{item.img}</Text>

                    <Text className='text-white mt-5 w-20 text-center font-regular text-lg'>{item.name}</Text>
                  </View>
                  <View className="ml-10">
                    <Text className='text-green-500  w-20 font-regular text-lg'>Detalhes:</Text>

                    <Text className="text-white font-regular text-lg">{selectedService}</Text>
                    <Text className="text-white font-regular text-lg">{selectedDate}</Text>
                  </View>
                </View>
                <View className='w-screen bg-zinc-500 mt-4'style={{height:1}}></View>

                <ScrollView

                horizontal={true}
                className="flex-row">
                {availableTimes.map(time => (
                  <TouchableOpacity
                  onPress={() => SelectTime(time.time)}
                   key={time.time}
                   className={`border border-white w-20 h-10 mt-4 ml-12 rounded-lg justify-center ${selectedTime === time.time ? 'bg-zinc-200' : ''}`}>
                    <Text className={`text-white text-center ${selectedTime === time.time ? 'text-black' : ''}`}>{time.time}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

                <View className=' w-screen bg-zinc-500 mt-4 ' style={{height:1}}></View>
              </React.Fragment>
            )
          }})}
      {selectedTime && <ScheduleConfirmation />}
            </ScrollView>
        </View>
    )
}