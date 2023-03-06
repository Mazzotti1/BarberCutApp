import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import 'moment/locale/pt-br';

const ScheduleCalendar = () => {

  const today = new Date();
return(
  <View className='font-regular'>
    <CalendarStrip

      selectedDate={today}
      calendarColor={'transparent'}
      dateNumberStyle={{ color: 'white', fontSize: 15 }}
      dateNameStyle={{ color: 'white',  fontSize: 12  }}
      calendarHeaderStyle={{ color: 'white', fontSize:20 }}
      style={{height:90, paddingTop: 5}}
      scrollable={true}
      highlightDateContainerStyle={{ backgroundColor: '#0d0d0d'}}
      highlightDateNameStyle={{ color: '#f03c3c', fontSize:14, fontWeight:'700'}}
      highlightDateNumberStyle={{ color: '#f03c3c', fontSize:16}}
      locale={{ name: 'pt-br', config: { weekdaysMin: 'D_S_T_Q_Q_S_S'.split('_') } }}
      leftSelector={null}
      rightSelector={null}
      minDate={today}
    />
  </View>
  );
}



export default ScheduleCalendar