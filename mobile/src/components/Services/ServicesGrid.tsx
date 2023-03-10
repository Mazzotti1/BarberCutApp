
import {View, ScrollView, Text} from 'react-native'

import Corte from '../../assets/corte.svg'
import Barba from '../../assets/barba.svg'
import Sobrancelha from '../../assets/sobrancelha.svg'
import BarbaCorte from '../../assets/barbaCorte.svg'

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
    return(
        <ScrollView
        horizontal={true}
        className=' '>
                <View className='grid-rows-3 flex-row gap-10 p-5' >
                    { services.map(function(item, index){
                    return(
                            <View key={index} className='flex items-center  w-fit rounded-3xl'style={{backgroundColor:'#0a0a0a'}}>
                            <View>{item.img}</View>
                            <Text className='text-gray-300 text-lg font-regular p-1 '>{item.title}</Text>

                            </View>


                         )
                          })}
                </View>
            </ScrollView>
    )
}