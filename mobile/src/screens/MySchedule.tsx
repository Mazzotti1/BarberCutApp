import { useNavigation } from "@react-navigation/native"
import { Calendar, FacebookLogo, GoogleLogo } from "phosphor-react-native"
import { useRef, useState } from "react"
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { ScrollView } from "react-native"

import { Header } from "../components/Header/Header"
import { NavContainer } from "../components/NavContainer"
import Sidebar from "../components/Utils/SideBar"


export function MySchedule (){
    const { navigate } = useNavigation()

  const [openSidebar, setOpenSidebar] = useState(false);
  const translateX = useRef(new Animated.Value(-400)).current;

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


    return(
        <View className="flex-1">
              <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, }}
            className='flex-1 pt-11 '
            style={{backgroundColor:'#030303',}}
            >

              <Header handleSidebar={handleSidebar}/>

              <Sidebar isOpen={openSidebar}  />

            <View className="mt-2 bg-black h-full  items-center">
                <View className="mt-5  ">
                    <Calendar size={208} color="#ededed" weight="thin" />
                </View>

                    <View className="items-center ">
                        <Text className="text-white font-regular text-3xl">Meus agendamentos</Text>
                        <Text className="text-zinc-500 font-regular text-xl mt-5">Faça login para continuar</Text>
                    </View>


                    <TouchableOpacity
                      className='items-center mt-4'
                      activeOpacity={0.5}
                      onPress={()=>{
                        navigate('login')
                      }}>
                    <View className='items-center p-2 w-52 rounded-xl mt-2' style={{backgroundColor:'#0a0a0a'}}>
                        <Text className='font-regular text-gray-300 text-xl'>Continuar com email</Text>
                    </View>
                    </TouchableOpacity>


                    <View className='items-center flex-row p-2 w-fit rounded-xl mt-4 bg-blue-800'>
                        <FacebookLogo size={32} color="#ededed" weight="thin" />
                        <Text className='font-regular text-gray-300 text-xl '>Continuar com facebook</Text>
                        </View>

                        <View className='items-center flex-row p-2 w-fit rounded-xl mt-4 bg-slate-600'>
                        <GoogleLogo size={32} color="#ededed" weight="thin" />
                        <Text className='font-regular text-gray-300 text-xl '>Continuar com Google</Text>
                        </View>

                        <TouchableOpacity
                      className='items-center mt-4'
                      activeOpacity={0.5}
                      onPress={()=>{
                        navigate('register')
                      }}>
                        <View className='items-center mt-4'>
                        <Text className='font-regular text-2xl text-white ' >Cadastre-se</Text>
                    </View>
                    </TouchableOpacity>
            </View>

            </ScrollView>
            {openSidebar && (
              <TouchableWithoutFeedback onPress={handleCloseSideBar}>
                <View style={StyleSheet.absoluteFillObject} />
              </TouchableWithoutFeedback>
            )}
            <NavContainer />
        </View>
    )
}


