
import { SetStateAction, useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native"

import { HeaderService } from "../components/Header/HeaderService"


import { TouchableOpacity } from "react-native";

import { Name } from "../components/InputsRegisterLogin/Name";
import { Email } from "../components/InputsRegisterLogin/Email";
import { Password } from "../components/InputsRegisterLogin/Password";
import { PhoneNumber } from "../components/InputsRegisterLogin/PhoneNumber";

import { api } from "../lib/axios";

import { useNavigation } from "@react-navigation/native";



export function Register(){
    const { navigate } = useNavigation()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleNameChange = (value:string) => {
      setName(value);
    };

    const handleEmailChange = (value:string) => {
      setEmail(value);
    };

    const handlePasswordChange = (value:string) => {
      setPassword(value);
    };

    const handlePhoneNumberChange = (value:string) => {
      setPhoneNumber(value);
    };

    const handleSubmit = async () => {
        if (name && email && password && phoneNumber) {
          const userData = {
            nome: name,
            email: email,
            password: password,
            userNumber: phoneNumber
          };
          try {
            const response = await api.post('/register', userData, {
              headers: {'Content-Type': 'application/json'},
            });
            setName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            Alert.alert(response.data)
          } catch (error : any) {
            Alert.alert(error.response.data)
          }
        } else {
            Alert.alert('Por favor, preencha todos os campos');
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

        <View className='flex items-center'>
                <View className="mt-28">
                    <Text className="font-regular text-3xl text-white  ">Novo Cadastro</Text>
                </View>

                    <Name value={name} onChangeText={handleNameChange}/>
                    <Email value={email} onChangeText={handleEmailChange}/>
                    <Password value={password} onChangeText={handlePasswordChange}/>
                    <PhoneNumber value={phoneNumber} onChangeText={handlePhoneNumberChange}/>

                <TouchableOpacity onPress={handleSubmit}
                className="w-64 h-10 mt-6 flex-row bg-zinc-300  items-center justify-center   border rounded-full">
                    <Text className="text-black text-xl font-regular">Cadastrar</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                navigate('login')
               }}
                className="w-64 h-10 mt-6 flex-row   items-center justify-center   border rounded-full">
                    <Text className="text-zinc-300 text-xl font-regular underline">Já tenho uma conta</Text>

                </TouchableOpacity>
        </View>





        </ScrollView>

        </View>
    )
}