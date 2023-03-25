
import React, { useRef, useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Animated, TouchableWithoutFeedback, StyleSheet} from 'react-native'


import Barber1 from '../../assets/barber1.svg'
import Barber2 from '../../assets/barber2.svg'


import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg';



type ServiceDetails = {
    title: string;
    img: React.FC<SvgProps>;
    description:string;
  };

  const details = [
    {
        title:"Matheus Souza",
        img: Barber1,
        description:"Barbeiro a 10 anos, especialista em fades e sobrancelha."
    },
    {
        title:"João Guilherme",
        img:Barber2,
        description:"Atuo como barbeiro a 6 anos, manjo muito em platinar e deixar a barba na régua."
    },

]

export function BarbersList(){

    const { navigate } = useNavigation()


    const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
    const translateY = useRef(new Animated.Value(0)).current;


    function handleServiceClick(details: ServiceDetails){
      setSelectedService(details);
      Animated.timing(translateY, {
        toValue: -600,
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
    <View
    className=''>
            <View className='grid-rows-3  gap-10 p-5 h-screen ' >
                { details.map(function(item, index){

                return(
                    <TouchableOpacity  key={index} onPress={() => handleServiceClick(item)}>
                    <View key={index} className='flex flex-row items-start w-fit rounded-3xl' style={{backgroundColor:'#0a0a0a'}}>
                    <View className=''><item.img /></View>
                    <View className='ml-2 grid grid-rows-2 items-start w-52'>
                      <Text className='text-gray-300 text-lg font-regular p-1'>{item.title}</Text>
                      <Text className='text-gray-300 text-md font-regular p-3 flex-wrap'>{item.description}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                     )
                      })}

                {selectedService && (
                  <>
                    <TouchableWithoutFeedback onPress={handleCloseClick}>
                      <View style={StyleSheet.absoluteFillObject} />
                    </TouchableWithoutFeedback>
                    <Animated.View className='absolute  bottom-0 left-10 right-0  bg-white rounded-tl-3xl rounded-tr-3xl' style={[{ transform: [{ translateY }] }]}>

                    <View className='absolute top-0 bottom-0 left-0 right-0 h-96 rounded-tl-3xl rounded-tr-3xl' style={{backgroundColor:'#E9E9E9'}}>
                        <View className='m-10 flex-row'>
                        <selectedService.img />
                        <Text className='text-neutral-900 text-lg font-regular ml-7 mt-3'>{selectedService.title}</Text>
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
        </View>
    )
}