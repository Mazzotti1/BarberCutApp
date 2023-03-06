

import React, { useState } from 'react';
import {View, ScrollView} from 'react-native'


import { HeaderService } from '../components/Header/HeaderService'
import { NavContainer } from '../components/NavContainer'



import { ServicesList } from '../components/Services/ServicesList';




export function Services(){


    return(
        <View className='flex-1'>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, }}
        className='flex-1 pt-11'
        style={{backgroundColor:'#030303',}}
        >
        <HeaderService />

        <View className='flex items-center mt-14'>

        </View>

        <ServicesList  />



        </ScrollView>
           <NavContainer />
        </View>
    )
 }
