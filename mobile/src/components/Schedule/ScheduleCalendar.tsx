import { View, StyleSheet, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import 'moment/locale/pt-br';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { Moment } from 'moment';

interface DateObject {
  date: string;
}

export default function  ScheduleCalendar(){
  const [dates, setDates] = useState<DateObject[]>([ ]);


  const today = new Date();

  useEffect(() => {
    api.get('/calendar')
      .then(response => {
        setDates(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const markedDates = dates.map(date => ({
    date: date.date,
    dots: [
      {
        key: 'event',
        color: '#f03c3c',
        selectedDotColor: '#ffffff',
      },
    ],
  }));

  const handleDateSelected = (date: Date) => {
    if (date) {
      AsyncStorage.setItem('selectedDate', date.toISOString());

      // AsyncStorage.getItem('selectedDate')
      // .then((selectedDate) => {
      //   console.log(selectedDate);
      // })
    }
  };

  return (
    <View className='font-regular '>
      <CalendarStrip
        selectedDate={new Date()}
        calendarColor={'transparent'}
        dateNumberStyle={{ color: 'white', fontSize: 15 }}
        dateNameStyle={{ color: 'white', fontSize: 12 }}
        calendarHeaderStyle={{ color: 'white', fontSize: 20 }}
        style={{ height: 90, paddingTop: 5 }}
        scrollable={true}
        highlightDateContainerStyle={{ borderWidth: 1, borderColor: 'white', backgroundColor: '#c7c5c1' }}
        highlightDateNameStyle={{ color: '#f03c3c', fontSize: 14, marginTop: 7, fontWeight: '700' }}
        highlightDateNumberStyle={{ color: '#f03c3c', fontSize: 16 }}
        locale={{ name: 'pt-br', config: { weekdaysMin: 'D_S_T_Q_Q_S_S'.split('_') } }}
        leftSelector={null}
        rightSelector={null}
        minDate={new Date()}
        markedDates={markedDates}
        onDateSelected={(date: Moment) => handleDateSelected(date.toDate())}
      />
    </View>
  );
}





