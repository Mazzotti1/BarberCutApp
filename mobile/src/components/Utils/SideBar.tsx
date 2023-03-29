import AsyncStorage from "@react-native-async-storage/async-storage";
import { House, MapPin, Scissors, SignOut, User, UsersThree } from "phosphor-react-native";
import { useEffect, useRef, useState, } from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";


import { api } from "../../lib/axios";
import jwt_decode from 'jwt-decode'


import { useNavigation } from "@react-navigation/native";

interface SidebarProps {
    isOpen: boolean;
    handleCloseSideBar: ()=> void;
  }

   interface DecodedToken {
     id: string;
     name: string;
     email: string;

   }

export default function Sidebar({ isOpen, handleCloseSideBar }: SidebarProps) {
    const translateX = useRef(new Animated.Value(-400)).current;
    const [usuario, setUsuario] = useState({ nome: '', email: '' });



    const { navigate } = useNavigation()

    useEffect(() => {
      if (isOpen) {
        Animated.timing(translateX, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateX, {
          toValue: -350,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }

      async function carregarUsuario() {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          return; // usuário não está logado
        }
        const decodeToken = jwt_decode(token ?? '') as DecodedToken
        const userId = decodeToken.id
        try {
          const response = await api.get(`/users/${userId}`, {
          });
          setUsuario(response.data);
        } catch (error) {
          console.error(error);
        }

      }
      carregarUsuario()
    }, [isOpen]);


    const singOut = async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        navigate('login')
        handleCloseSideBar()

      } catch (error) {

      }
    };

    const menuItems = [
      {
        icon: <House size={52} color="#0b0b0b" weight="thin" />,
        label: 'Principal',
        onPress: () => navigate('home')
      },
      {
        icon: <User size={52} color="#0b0b0b" weight="thin" />,
        label: 'Meus dados',
        onPress: () => navigate('mydata')
      },
      {
        icon: <MapPin size={52} color="#0b0b0b" weight="thin" />,
        label: 'Meu endereço',
        onPress: () => navigate('address')
      },
      {
        icon: <UsersThree size={52} color="#0b0b0b" weight="thin" />,
        label: 'Profissionais',
        onPress: () => navigate('barbers')
      },
      {
        icon: <Scissors size={52} color="#0b0b0b" weight="thin" />,
        label: 'Serviços',
        onPress: () => navigate('services')
      },
      {
        icon: <SignOut size={52} color="#0b0b0b" weight="thin" />,
        label: 'Sair',
        onPress: singOut
      }
    ];

    return (
      <Animated.View style={[styles.sidebar, { transform: [{ translateX }], },]}>
        <View className="m-10 flex-row">
          <View className="bg-slate-300 w-12 h-12 rounded-full justify-center items-center mr-4">
            <User size={27} color="#0b0b0b" weight="thin" />
          </View>
          <View className="">
            <Text className="text-black font-regular text-lg">{usuario.nome.charAt(0).toUpperCase() + usuario.nome.slice(1)}</Text>
            <Text className="text-black font-regular">{usuario.email.charAt(0).toUpperCase() + usuario.email.slice(1)}</Text>
          </View>
        </View>
        <View className="Line w-60 flex justify-center items-center ml-6 bg-zinc-500" style={{ height: 1 }}></View>
        {menuItems.map((item, index) => (
          <TouchableOpacity activeOpacity={0.5} onPress={item.onPress} key={index}>
            <View className="ml-10 mt-2 mb-4 flex-row items-center">
              {item.icon}
              <Text className="ml-4">{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View className="Line w-60 flex justify-center items-center ml-6 bg-zinc-500" style={{ height: 1 }}></View>
      </Animated.View>
    );
}
  const styles = StyleSheet.create({
    sidebar: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      height:800,
      right: 100,
      backgroundColor: 'white',
      zIndex: 999,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },

  });