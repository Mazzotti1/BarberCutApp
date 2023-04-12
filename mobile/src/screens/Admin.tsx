import { Loading } from "../components/Utils/Loading";

import { View, Text, ScrollView, TouchableOpacity, Linking,
   Animated, TouchableWithoutFeedback, StyleSheet } from "react-native"


import { NavContainer } from "../components/NavContainer";

import { useRef, useState } from "react";
import Sidebar from "../components/Utils/SideBar";
import { AdminButtons } from "../components/Admin/AdminButtons";
import { AdminAppointments } from "../components/Admin/AdminAppointments";
import { HeaderService } from "../components/Header/HeaderService";



export function Admin(){

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

    if (!Admin) {
        return (
          <Loading />
        );
      }

    return(
      <TouchableOpacity
      activeOpacity={1}
      onPress={handleCloseSideBar}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
    <ScrollView

    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 100, }}
    className='flex-1 pt-11'
    style={{backgroundColor:'#030303',}}>


        <HeaderService/>


          <Sidebar isOpen={openSidebar}  handleCloseSideBar={handleCloseSideBar}/>


        <View className=" flex-1 items-center mt-6">
            <AdminButtons />
            <AdminAppointments/>
        </View>

    </ScrollView>



        <NavContainer />
    </View>
    </TouchableOpacity>
      )
}



