import AsyncStorage from "@react-native-async-storage/async-storage"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { Calendar, FacebookLogo, GoogleLogo } from "phosphor-react-native"
import { useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { ScrollView } from "react-native"

import { Header } from "../components/Header/Header"
import { NavContainer } from "../components/NavContainer"
import Sidebar from "../components/Utils/SideBar"
import { api } from "../lib/axios"

import jwt_decode from 'jwt-decode'
import { Loading } from "../components/Utils/Loading"
import  {Google}  from "../components/SignIn/Google"

interface DecodedToken {
  name: string;
  id: string;
}

interface User {
  id: string;
  nome: string;
}

interface Appointment {
  user_id:string;
  barber:string;
  service:string;
  date: string;
  time: string;
  user: User;
}

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function MySchedule (){
    const { navigate } = useNavigation()

  const [isLogged, setIsLogged] = useState(false);
  const isFocused = useIsFocused();

  const [openSidebar, setOpenSidebar] = useState(false);
  const translateX = useRef(new Animated.Value(-400)).current;

  const [hasAppointments, setHasAppointments] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    checkIsLogged();
  }, []);

  const checkIsLogged = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLogged(true);
        loadAppointments();
      } else {
        setIsLogged(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLogged(false);
      setIsLoading(false);
    }
  };

  const loadAppointments = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const decodeToken = jwt_decode(token ?? '') as DecodedToken;
    const userId = decodeToken.id;
    try {
      const response = await api.get(`/appointments/${userId}`);
      const appointmentsWithUser = await Promise.all(
        response.data.map(async (appointment: Appointment) => {
          const userResponse = await api.get(`/users/${appointment.user_id}`);
          const user = userResponse.data;
          return { ...appointment, user };
        })
      );
      setAppointments(appointmentsWithUser);
      setHasAppointments(appointmentsWithUser.length > 0);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor:'black'}}>
        <Loading />
      </View>
    );
  }


  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleCloseSideBar}
      style={{ flex: 1 }}
    >

      {isLogged ? (
        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, }}
            className='flex-1 pt-11 '
            style={{backgroundColor:'#030303',}}
          >
            <Header handleSidebar={handleSidebar}/>
            <Sidebar isOpen={openSidebar} handleCloseSideBar={handleCloseSideBar}  />

            {hasAppointments ? (

              <View className="mt-2 bg-black   items-center" style={{height:600}}>
                <View className="items-center pt-5 ">
                  <Text className="text-white font-regular text-3xl">Seus agendamentos</Text>
                </View>
                  {appointments.map((appointment) => (
                  <View className="mt-5  bg-slate-200 border rounded-2xl "style={{width:350}} key={appointment.service}>
                    <Text className="text-black p-3 font-regular  text-lg">
                      Olá! {appointment.user.nome.charAt(0).toUpperCase() +
                     appointment.user.nome.slice(1)} o seu serviço de {appointment.service} está
                      marcado para o
                      dia {new Date(appointment.date).getDate()} de {meses[new Date(appointment.date).getMonth()]} as {appointment.time} com
                     o {appointment.barber}! </Text>

                </View>
              ))}

              </View>
            ) : (
              <View className="mt-2 bg-black   items-center" style={{height:600}}>
                <View className="mt-5  ">
                  <Calendar size={208} color="#ededed" weight="thin" />
                </View>
                <View className="items-center pt-12 ">
                  <Text className="text-white font-regular text-3xl">Ops...</Text>
                  <Text className="text-zinc-500 font-regular text-center w-72 text-xl mt-5">Você não possui agendamentos, que tal agendar um horário?</Text>
                </View>
                <TouchableOpacity
                  className='items-center bg-zinc-200 mt-10 rounded-xl w-32'
                  activeOpacity={0.5}
                  onPress={()=>{
                    navigate('schedule')
                  }}>
                  <View className='items-center  '>
                    <Text className='font-regular text-2xl text-black p-2 ' >Agendar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

          </ScrollView>
          <NavContainer />
        </View>
      ) : (
        <View className="flex-1">
        <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50, }}
      className='flex-1 pt-11 '
      style={{backgroundColor:'#030303',}}
      >

        <Header handleSidebar={handleSidebar}/>

        <Sidebar isOpen={openSidebar} handleCloseSideBar={handleCloseSideBar}  />

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

                <Google />

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
      <NavContainer />
      </View>
      )}
    </TouchableOpacity>
  );

}
