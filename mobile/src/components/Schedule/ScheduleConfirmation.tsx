import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { Moment } from 'moment';
import { useNavigation } from '@react-navigation/native';

import jwt_decode from 'jwt-decode'

interface DecodedToken {
    id: string;


  }

  interface AppointmentID {
    id: string;
  }

export default function  ScheduleConfirmation(){
    const { navigate } = useNavigation()
    const [disabled, setDisabled] = useState(false);

  const [appointmentID, setAppointmentID] = useState('');


    async function handlePress() {
        const selectedTime = await AsyncStorage.getItem('selectedTime');
        const selectedDate = await AsyncStorage.getItem('selectedDate');
        const selectedBarber = await AsyncStorage.getItem('selectedBarber');
        const selectedService = await AsyncStorage.getItem('selectedService');
        const userToken = await AsyncStorage.getItem('userToken');

        const decodeToken = jwt_decode(userToken ?? '') as DecodedToken
        const userId = decodeToken.id

            const payload = {
                user: userId,
                barber: selectedBarber,
                date: selectedDate,
                service: selectedService,
                time: selectedTime
            };


       const response = await api.post('/confirm', payload, )

        if (disabled) {
          return;
        }

          setDisabled(true);
          setTimeout(() => {
            setDisabled(false);
          }, 5000);
          Alert.alert('Agendamento confirmado');
      }


  return (
    <View className='font-regular pt-8 '>
          <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        className='flex items-center'>
        <View className='flex items-center w-52 p-3 bg-zinc-300 rounded-xl mb-10'>
          <Text className='font-regular text-black text-xl'>Confirmar agendamento</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}





