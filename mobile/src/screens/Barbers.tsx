
import {View} from 'react-native'
import { HeaderService } from '../components/Header/HeaderService'
import { NavContainer } from '../components/NavContainer'
import { BarbersList } from '../components/Barbers/BarbersList';

export function Barbers(){


    return(
        <View className='flex-1'>
        <View
        className='flex-1  pt-11'
        style={{backgroundColor:'#030303',}}
        >
        <HeaderService />
        <View className='flex mt-16 items-center'>
        </View>
        <BarbersList />
        </View>
           <NavContainer />
        </View>
    )
 }
