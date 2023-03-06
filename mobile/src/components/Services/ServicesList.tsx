
import React, { useRef, useState } from 'react';
import {View, Text, FlatList , Animated, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView} from 'react-native'



import Corte from '../../assets/corte.svg'
import Barba from '../../assets/barba.svg'
import Sobrancelha from '../../assets/sobrancelha.svg'
import BarbaCorte from '../../assets/barbaCorte.svg'

import { Clock, Money } from 'phosphor-react-native'

import { useNavigation } from '@react-navigation/native';






type ServiceDetails = {
    title: string;
    img: JSX.Element;
    time: string;
    value: string;
    description:string;
  };





export function ServicesList() {
  const details: ServiceDetails[] = [
    {
        title:"Corte",
        img: <Corte />,
        time: '40min',
        value: 'R$ 35,00',
        description:"Corte de cabelo com máquina, tesoura e lavagem."
    },
    {
        title:"Barba",
        img:<Barba />,
        time: '20min',
        value: 'R$ 25,00',
        description:"Corte de barba, com toalha quente para abrir os poros."
    },
    {
        title:"Sobrancelha",
        img:<Sobrancelha />,
        time: '20min',
        value: 'R$ 15,00',
        description:"Corte e design da sobrancelha pra deixar na régua."
    },

    {
        title:"Corte e barba",
        img:<BarbaCorte />,
        time: '60min',
        value: 'R$ 50,00',
        description:"Serviço completo com todos os benefícios."
    }
]


    const { navigate } = useNavigation()



    const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
    const translateY = useRef(new Animated.Value(0)).current;


    function handleServiceClick(details: ServiceDetails){
      setSelectedService(details);
      Animated.timing(translateY, {
        toValue: -400,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    function handleCloseClick(){
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setSelectedService(null));
    }



    return(

    <ScrollView

    className=' '>

            <View className='grid-rows-3  gap-10 p-5' >
                { details.map(function(item, index){

                return(
                    <TouchableOpacity  key={index} onPress={() => handleServiceClick(item)}>
                    <View key={index} className='flex flex-row items-start w-fit rounded-3xl' style={{backgroundColor:'#0a0a0a'}}>
                    <View className=''>{item.img}</View>
                    <View className='ml-2 grid grid-rows-2 items-start'>
                      <Text className='text-gray-300 text-lg font-regular p-1'>{item.title}</Text>
                      <View className='flex-row items-center gap-2'>
                        <Clock size={26} color="#ededed" weight="thin" />
                        <Text className='text-gray-300 text-md ml-2 font-regular p-1'>{item.time}</Text>
                        <Money size={26} color="#ededed" weight="thin" />
                        <Text className='text-gray-300 text-md ml-2 font-regular p-1'>{item.value}</Text>
                      </View>

                    </View>
                  </View>
                  </TouchableOpacity>
                     )
                      })}

                {selectedService && (
                  <>
                    <TouchableWithoutFeedback  onPress={handleCloseClick}>
                      <View  style={StyleSheet.absoluteFillObject} />
                    </TouchableWithoutFeedback>
                    <Animated.View className='absolute bottom-0 left-10 right-0   bg-white rounded-tl-3xl rounded-tr-3xl' style={[{ transform: [{ translateY }]  }]}>

                    <View className='absolute top-0  left-0 right-0 h-screen rounded-tl-3xl  rounded-tr-3xl' style={{backgroundColor:'#E9E9E9'}}>
                        <View className='m-10 flex-row'>
                          {selectedService.img}
                          <View className='ml-10'>
                            <Text className='text-lg font-regular'>{selectedService.title}</Text>
                            <Text className='text-zinc-600 text-md font-regular'>Valor: {selectedService.value}</Text>
                            <Text className='text-zinc-600 text-md font-regular'>Duração: {selectedService.time}</Text>
                          </View>
                        </View>
                          <View className='w-screen h-1 bg-neutral-900'></View>
                        <View className='ml-7 mt-7'>
                          <Text className='text-lg font-bold font-regular'>Descrição</Text>
                          <Text className='text-zinc-600 text-base  font-regular'>{selectedService.description}</Text>
                        </View>
                        <View className='flex items-center'>

                          <TouchableOpacity
                         activeOpacity={0.5}
                         onPress={()=>{
                          navigate('schedule')
                         }}
                          className='bg-zinc-900 flex items-center mt-10 w-48 p-2 rounded-lg'>
                            <Text className='text-xl font-regular text-gray-300'>Ir para agenda</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                    </Animated.View>
                    </>
                    )}

            </View>
        </ScrollView>
    )
 }
