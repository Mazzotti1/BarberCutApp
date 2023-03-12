import React, { useRef, useState } from 'react';

import {View, Text, ScrollView, SafeAreaView, Animated, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import { Loading } from '../components/Utils/Loading';

import { NavContainer } from '../components/NavContainer';
import { Header } from '../components/Header/Header';



 import { ScheduleButton } from '../components/Schedule/ScheduleButton';
 import { BarbersProfile } from '../components/Barbers/BarbersProfile';
 import { ServicesGrid } from '../components/Services/ServicesGrid';

import dayjs from 'dayjs';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import Sidebar from '../components/Utils/SideBar';

 export function Schedule(){

  const startDate = dayjs();

  const [openSidebar, setOpenSidebar] = useState(false);
  const translateX = useRef(new Animated.Value(-400)).current;

  function handleSidebar(){
    setOpenSidebar(true);
    Animated.timing(translateX, {
      toValue: -10,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  function handleCloseSideBar(){
    Animated.timing(translateX, {
      toValue: -350,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setOpenSidebar(false));
  }

    if (!Schedule) {
        return (
          <Loading />
        );
      }


    return(
        <View className='flex-1'>

            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, }}
            className='flex-1 pt-11'
            style={{backgroundColor:'#030303',}}
            >

            <Header handleSidebar={handleSidebar}/>
            <Sidebar isOpen={openSidebar}  />



                <View className='bg-black mt-6 flex items-center p-4'>



                    <View className='flex-row bg-black '>

                      <SafeAreaView className='flex-1 '>
                        <ScheduleCalendar />
                      </SafeAreaView>

                    </View>
                </View>

                <View className='bg-black  '>

                        <ServicesGrid />

                    <View>
                    <Text className='text-white text-2xl font-regular p-5'>Escolha um profissional</Text>
                    </View>


                         <BarbersProfile />


                        <ScheduleButton />
                </View>


            </ScrollView>
            {openSidebar && (
            <TouchableWithoutFeedback onPress={handleCloseSideBar}>
              <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
              )}
           <NavContainer />

        </View>
    )
 }