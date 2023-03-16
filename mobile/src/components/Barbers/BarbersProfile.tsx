
import { useEffect, useState } from 'react';
import {View, ScrollView, Text} from 'react-native'

import Barber1 from '../../assets/barber1.svg'
import Barber2 from '../../assets/barber2.svg'
import { api } from '../../lib/axios';

interface Barber {
    id: number;
    name: string;
  }

export function BarbersProfile(){
    const [barbers, setBarbers] = useState<Barber[]>([]);

    useEffect(() => {
      async function loadBarbers() {
        const response = await api.get('/barbers');
        setBarbers(response.data.barbers);
      }
      loadBarbers();
    }, []);

    const barbersList = [
      {
        id: barbers[0]?.id,
        name: barbers[0]?.name,
        img: <Barber1 />
      },
      {
        id: barbers[1]?.id,
        name: barbers[1]?.name,
        img: <Barber2 />
      },

    ];

    return(
        <ScrollView
        horizontal={true}
        className=' '>
            <View className='grid-rows-3 flex-row gap-10 p-7 ' >
                { barbersList.map(function(item, index){
                return(
                        <View key={index} className='flex items-center  w-fit rounded-3xl'style={{backgroundColor:'#0a0a0a'}}>
                        <View>{item.img}</View>
                        <Text className='text-gray-300 text-lg font-regular p-3 '>{item.name}</Text>
                        </View>

                     )
                      })}
            </View>

        </ScrollView>
    )
}