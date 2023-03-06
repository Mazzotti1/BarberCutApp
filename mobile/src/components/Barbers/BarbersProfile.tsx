
import {View, ScrollView, Text} from 'react-native'

import Barber1 from '../../assets/barber1.svg'
import Barber2 from '../../assets/barber2.svg'

const barbers = [
    {
        name:"Matheus Souza",
        img: <Barber1 />
    },
    {
        name:"João Guilherme",
        img:<Barber2 />
    },
]

export function BarbersProfile(){
    return(
        <ScrollView
        horizontal={true}
        className=' '>
            <View className='grid-rows-3 flex-row gap-10 p-7 ' >
                { barbers.map(function(item, index){
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