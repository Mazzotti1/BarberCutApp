
import {View, ScrollView, Text, TouchableOpacity} from 'react-native'

import Corte from '../../assets/corte.svg'
import Barba from '../../assets/barba.svg'
import Sobrancelha from '../../assets/sobrancelha.svg'
import BarbaCorte from '../../assets/barbaCorte.svg'
import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { BarbersProfile } from '../Barbers/BarbersProfile'
import { ScheduleButtonLogged } from '../Schedule/ScheduleButtonLogged'



const services = [
    {
        title:"Corte",
        img: <Corte />
    },
    {
        title:"Barba",
        img:<Barba />
    },
    {
        title:"Sobrancelha",
        img:<Sobrancelha />
    },
    {
        title:"Corte e barba",
        img:<BarbaCorte />
    }
]


export function ServicesGrid(){
    const [selectedService, setSelectedService] = useState('');



    function handleClick(title:string){
        setSelectedService(title);

      }

      async function saveTittle(title: string) {
        setSelectedService(title);
        await AsyncStorage.setItem('selectedService', title);

      }





    return(
        <View>
        <ScrollView

        horizontal={true}
        className=' '>
                <View className='grid-rows-3 flex-row gap-10 p-5' >
                    { services.map(function(item, index){
                    return(
                            <TouchableOpacity

                            key={index}
                            className={`flex items-center  w-fit rounded-3xl ${
                                item.title === selectedService ? 'border-2 border-white rounded-2xl' : null
                              }`}
                              onPress={() =>{
                                handleClick(item.title)
                                saveTittle(item.title)

                              } }
                            style={{backgroundColor:'#0a0a0a'}}>
                            <View>{item.img}</View>
                            <Text className='text-gray-300 text-lg font-regular p-1 '>{item.title}</Text>
                            </TouchableOpacity>
                         )
                          })}
                </View>
            </ScrollView>
                      </View>
    )

}

