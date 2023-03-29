

import { Check } from 'phosphor-react-native';
import React, { useState } from 'react';
import {View, ScrollView, Text} from 'react-native'


import { HeaderService } from '../components/Header/HeaderService'
import { NavContainer } from '../components/NavContainer'



import { ServicesList } from '../components/Services/ServicesList';




export function Faq(){


    return(
        <View className='flex-1'>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, }}
        className='flex-1 pt-11'
        style={{backgroundColor:'#030303',}}
        >
        <HeaderService />

        <View className='flex ml-10 '>
            <Text className='text-white mt-5  font-regular text-2xl'>Instruções</Text>

            <Text className='text-white mt-5 mr-5 font-regular text-xl'> Após estar logado você consegue gerenciar o seu perfil e os seus dados nos 3 riscos no canto superior esquerdo</Text>
              <View className='rounded-full p-3 border mt-2  border-red-600 w-14 h-14 '>
                <View  className="bg-white w-7 h-1 mt-1 mb-1 rounded-md"></View>
                <View  className="bg-white w-7 h-1  mb-1 rounded-md"></View>
                <View  className="bg-white w-7 h-1  rounded-md"></View>
            </View>

            <Text className='text-white mt-5 mr-5 font-regular text-xl'> Na tela de agendamentos, você pode escolher um dia, um serviço e um profissional para agendar um horário!</Text>

            <Text className='text-white mt-5 mr-5 font-regular text-xl'> Quando você escolher suas preferências, vai estar disponível para você escolher o horário do agendamento. </Text>

            <Text className='text-white mt-5 mr-5 font-regular text-xl'> Basta escolher um horário e confirmar o agendamento! Você ja vai poder verificar na tela dos seus agendamentos!</Text>
                <View className='pl-3 mt-2'>
                    <Check size={48} color="#32a850" weight="bold" />
                </View>
            </View>

        </ScrollView>
           <NavContainer />
        </View>
    )
 }
