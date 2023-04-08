
import { useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native"

import { HeaderService } from "../components/Header/HeaderService"


import { TouchableOpacity } from "react-native";


import { Email } from "../components/InputsRegisterLogin/Email";
import { Password } from "../components/InputsRegisterLogin/Password";
import { Scissors } from "phosphor-react-native";

import { api } from "../lib/axios";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';


export function Login(){
    const { navigate } = useNavigation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [disabled, setDisabled] = useState(false);

    async function saveUser(token:string) {
        await AsyncStorage.setItem('userToken', JSON.stringify(token))
      }

    const handleSubmit = async () => {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 2000);
        if (email && password) {
          try {
        const  response =  await api.post('/login', { email, password });
            const token = response.data
            await saveUser(token)

            setEmail('');
            setPassword('');


            const user = await AsyncStorage.removeItem('googleData');
            Alert.alert('Login realizado com sucesso!');
            navigate('home')
          } catch (error) {
            Alert.alert('Erro ao realizar login', 'Verifique seu email e senha e tente novamente.');
            setEmail('');
            setPassword('');

          }
        } else {
          Alert.alert('Por favor, preencha seu email e senha para fazer login');
        }
      };


    return(
        <View className='flex-1'>
        <ScrollView
        contentContainerStyle={{ paddingBottom: 50, }}
        className='flex-1 pt-11'
        style={{backgroundColor:'#030303',}}
        >
        <HeaderService />

        <View className='flex items-center mt-20'>
        <Scissors size={82} color="#ededed" weight="thin" />
                <View className="mt-5">

                    <Text className="font-regular text-3xl text-white  ">Acesse sua conta</Text>
                </View>


                    <Email onChangeText={setEmail} value={email} />
                    <Password onChangeText={setPassword} value={password}/>

                <TouchableOpacity
                onPress={()=>{
                  navigate('forgotpassword')
                 }}
                className="  items-center justify-center   border rounded-full">
                    <Text className="text-slate-300 mt-2 text-base font-regular underline">Esqueci minha senha</Text>

                </TouchableOpacity>

                <TouchableOpacity
                disabled={disabled}
                onPress={handleSubmit}
                className="w-64 h-10 mt-6 flex-row bg-zinc-300  items-center justify-center   border rounded-full">
                    <Text className="text-black text-xl font-regular">Entrar</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                navigate('register')
               }}
                className="w-64 h-10 mt-6 flex-row   items-center justify-center   border rounded-full">
                    <Text className="text-zinc-300 text-xl font-regular underline">Ainda não tenho uma conta</Text>

                </TouchableOpacity>
        </View>





        </ScrollView>

        </View>
    )
}