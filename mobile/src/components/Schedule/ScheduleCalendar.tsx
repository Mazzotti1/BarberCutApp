import { View, StyleSheet, Text, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import 'moment/locale/pt-br';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { Moment } from 'moment';
import { Loading } from '../Utils/Loading';
import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { Ionicons } from '@expo/vector-icons';



interface DateObject {
  date: string;
}

export default function  ScheduleCalendar(){
  const [dates, setDates] = useState<DateObject[]>([ ]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();

  useEffect(() => {
    api.get('/calendar')
      .then(response => {
        setDates(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View className='flex justify-center items-center'>
        <Loading />
      </View>
    );
  }

  const markedDates = dates.map(date => ({
    date: date.date,
    dots: [
      {
        key: 'event',
        color:'black',
        selectedDotColor: '#ffffff',
      },
    ],

  }
  ));

  const handleDateSelected = (date: Date) => {
    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate.getTime() < today.getTime()) {
        Alert.alert('Ops', 'Você selecionou uma data que já passou!');
      } else {
        AsyncStorage.setItem('selectedDate', date.toISOString());
      }
    }
  };

  return (
    <View className='font-regular '>
       {isLoading ? (
        <View className='flex justify-center items-center'>
          <Loading />
        </View>
      ) : (
      <CalendarStrip
        selectedDate={new Date()}
        calendarColor={'transparent'}
        dateNumberStyle={{ color: 'white', fontSize: 15 }}
        dateNameStyle={{ color: 'white', fontSize: 12 }}
        calendarHeaderStyle={{ color: 'white', fontSize: 20 }}
        style={{ height: 90, paddingTop: 5 }}
        scrollable={true}
        highlightDateContainerStyle={{ borderWidth: 1, borderColor: 'white', backgroundColor: '#dde4f0' }}
        highlightDateNameStyle={{ color: '#f03c3c', fontSize: 14, marginTop: 7, fontWeight: '700' }}
        highlightDateNumberStyle={{ color: '#f03c3c', fontSize: 16, justifyContent:'center' }}
        locale={{ name: 'pt-br', config: { weekdaysMin: 'D_S_T_Q_Q_S_S'.split('_') } }}
        minDate={new Date()}
        markedDates={markedDates}
        onDateSelected={(date: Moment) => handleDateSelected(date.toDate())}
        scrollToOnSetSelectedDate={true}
        leftSelector={
          <CaretLeft
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        }
        rightSelector={
          <CaretRight
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
        }

      />
       )}
    </View>
  );
}


