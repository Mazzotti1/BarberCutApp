import { Loading } from "../components/Utils/Loading";

import { View, Text, ScrollView, TouchableOpacity, Linking,
   Animated, TouchableWithoutFeedback, StyleSheet } from "react-native"

import { Header } from "../components/Header/Header"
import { HomeButtons } from "../components/HomeButtons";
import { NavContainer } from "../components/NavContainer";

import Logo from '../assets/logo.svg'
import {DeviceMobileCamera, Envelope, InstagramLogo, FacebookLogo} from 'phosphor-react-native'
import { useRef, useState } from "react";
import Sidebar from "../components/Utils/SideBar";


const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const time = ['13:00 - 20:30']
export function Home(){

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

    if (!Home) {
        return (
          <Loading />
        );
      }

    return(
      <View className="flex-1">
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 100, }}
    className='flex-1 pt-11'
    style={{backgroundColor:'#030303',}}>


        <Header handleSidebar={handleSidebar}/>


          <Sidebar isOpen={openSidebar}  />


        <View className=" flex-1 items-center mt-6">
          <Logo width={350} height={335} />

          <HomeButtons />

          <View className="Calendario bg-neutral-900 w-96  mt-3  rounded-xl border-black border shadow-lg" >
          <Text className="text-white font-regular text-2xl p-6 text-center">SHARP CUT Barber Shop</Text>
              <Text className="text-zinc-500 font-regular text-base pl-4 mb-3 ">HORÁRIOS DE FUNCIONAMENTO</Text>

          <View className="flex-row gap-36">
            <View className="pb-5 ">
               { days.map(function(item, index){
                return(
                  <Text className="text-white font-regular text-base pl-4 mb-1 " key={index}>{item}</Text>
                )
              })}
            </View>
              <View>
                  {
                  Array.from({ length: 5 }, (_, i) => (
                    <Text className="text-white font-regular text-base pl-4 mb-1" key={i}>
                      {time[0]}
                    </Text>

                  ))

                }
                  <Text className="text-white font-regular text-base pl-4">09:00 - 19:00 </Text>
              </View>
            </View>

          </View>

          <View className="Line w-80 flex justify-center items-center mt-5  bg-zinc-500"style={{height:1}} ></View>

          <View className="Contact w-80 flex-row justify-between">
            <View className="pl-4 mb-3 gap-2 ">
              <Text className="text-zinc-600 font-regular text-2xl">Contato</Text>
              <Text className="text-white font-regular text-lg">(51) 99283-7897</Text>
              <Text className="text-white font-regular text-lg">contato@sharpcut.com.br</Text>
            </View>

            <View className="flex justify-end mb-3 gap-2">
              <DeviceMobileCamera size={32} color="#ededed" weight="thin" />
              <Envelope size={32} color="#ededed" weight="thin" />
            </View>
          </View>

          <View className="Line w-80 flex justify-center items-center mt-5  bg-zinc-500"style={{height:1}} ></View>

          <View className="Adress w-96 gap-10  flex-row">
            <View className="pl-4 mb-3 gap-2 ">
              <Text className="text-zinc-600 font-regular text-2xl">Endereço</Text>
              <Text className="text-white font-regular text-lg">Avenida brasil, 887 - Sharp Cut Barbershop 92039-120 - Los angeles</Text>

            </View>



        </View>

        <View className="Line w-80 flex justify-center items-center mt-5  bg-zinc-500"style={{height:1}} ></View>

        <View className="Social w-80 flex-row justify-between">
            <View className="pl-4 mb-3 gap-2 ">
              <Text className="text-zinc-600 font-regular text-2xl">SOCIAL</Text>

              <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                Linking.openURL('https://www.instagram.com/omazzotti_/')
               }}>
              <Text className="text-white font-regular text-lg">Instagram</Text>
              </TouchableOpacity>



              <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                Linking.openURL('https://facebook.com/')
               }}>
              <Text className="text-white font-regular text-lg">Facebook</Text>
              </TouchableOpacity>

            </View>

            <View className="flex justify-end gap-1 mb-3 ">
            <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                Linking.openURL('https://www.instagram.com/omazzotti_/')
               }}
                >
              <InstagramLogo size={32} color="#ededed" weight="thin" />

              </TouchableOpacity>

              <TouchableOpacity
               activeOpacity={0.5}
               onPress={()=>{
                Linking.openURL('https://facebook.com/')
               }}
                >
              <FacebookLogo size={32} color="#ededed" weight="thin" />
              </TouchableOpacity>

            </View>
          </View>



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



