import React, { useEffect, useRef, useState } from 'react';

import {View, Text, ScrollView, SafeAreaView, Animated, TouchableWithoutFeedback, StyleSheet, TouchableOpacity} from 'react-native'
import { Loading } from '../components/Utils/Loading';

import { NavContainer } from '../components/NavContainer';
import { Header } from '../components/Header/Header';



 import { ScheduleButton } from '../components/Schedule/ScheduleButton';
 import { BarbersProfile } from '../components/Barbers/BarbersProfile';
 import { ServicesGrid } from '../components/Services/ServicesGrid';

import dayjs from 'dayjs';
import ScheduleCalendar from '../components/Schedule/ScheduleCalendar';
import Sidebar from '../components/Utils/SideBar';

import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export function Schedule(){

  const startDate = dayjs();


  const [isLogged, setIsLogged] = useState(false);
  const isFocused = useIsFocused();

  const [openSidebar, setOpenSidebar] = useState(false);
  const translateX = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    checkIsLogged();
  }, [isFocused]);

  const checkIsLogged = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

  };

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
      <TouchableOpacity
      activeOpacity={1}
      onPress={handleCloseSideBar}
      style={{ flex: 1 }}
    >
        {isLogged ? (
          <View className='flex-1'>
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, }}
          className='flex-1 pt-11'
          style={{backgroundColor:'#030303',}}
          >
          <Header handleSidebar={handleSidebar}/>
          <Sidebar isOpen={openSidebar} handleCloseSideBar={handleCloseSideBar} />
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
          <NavContainer />
          </View>


               ):(

                <View className='flex-1'>
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, }}
                className='flex-1 pt-11'
                style={{backgroundColor:'#030303',}}
                >
                <Header handleSidebar={handleSidebar}/>
                <Sidebar isOpen={openSidebar} handleCloseSideBar={handleCloseSideBar} />
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
               <NavContainer />
               </View>
               )
            }
        </TouchableOpacity>
    )
 }



