
import {  useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native"

import { HeaderService } from "../components/Header/HeaderService"

import { TouchableOpacity } from "react-native";

import { Name } from "../components/InputsRegisterLogin/Name";
import { Email } from "../components/InputsRegisterLogin/Email";
import { Password } from "../components/InputsRegisterLogin/Password";
import { PhoneNumber } from "../components/InputsRegisterLogin/PhoneNumber";

import { api } from "../lib/axios";

import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function Register(){
    const { navigate } = useNavigation()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [googleData, setGoogleData] = useState<{name: string, email: string, id: string} | null>(null);
    const [disabled, setDisabled] = useState(false);

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
      setDisabled(true);
       setTimeout(() => {
      setDisabled(false);
    }, 2000);
        if (name && email && password && phoneNumber) {
          const userData = {
            nome: name,
            email: email,
            password: password,
            userNumber: phoneNumber
          };
          if (password.length < 5) {
            Alert.alert('Senha inválida', 'A senha deve ter pelo menos 6 caracteres');
            return;
          }
          try {
            const response = await api.post('/register', userData, {
              headers: {'Content-Type': 'application/json'},
            });
            setName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');

            navigate("login")
            const user = await AsyncStorage.removeItem('googleData');
            Alert.alert('Usuário registrado com sucesso!')
          } catch (error : any) {
            Alert.alert('Email ou número de telefone já existem!')
          }
        } else {
            Alert.alert('Por favor, preencha todos os campos');
        }
      };

      useEffect(() => {
        const getGoogleData = async () => {
          const user = await AsyncStorage.getItem('googleData');
          if (user != null) {
            const data = JSON.parse(user);
            setEmail(data.email);
            setName(data.name);
            setPassword(data.id);
            setGoogleData(data);
          }
        };
        getGoogleData();
      }, []);



      async function saveUser(token:string) {
          await AsyncStorage.setItem('userToken', JSON.stringify(token))
        }

      const handleLogin = async () => {
          if (email && password) {
            try {
          const  response =  await api.post('/login', { email, password });
              const token = response.data
              await saveUser(token)
              navigate('home')
            } catch (error) {
              console.log(error)
            }
          }
        };

      return (
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            className="flex-1 pt-11"
            style={{ backgroundColor: "#030303" }}
          >
            <HeaderService />

            <View className="flex items-center">
              <View className="mt-28">
                <Text className="font-regular text-3xl text-white  ">
                  Novo Cadastro
                </Text>
              </View>

              <Name value={name} onChangeText={handleNameChange} />

              <Email value={email} onChangeText={handleEmailChange} />

              <PhoneNumber value={phoneNumber} onChangeText={handlePhoneNumberChange} />

              {!googleData && (
                <>
                  <Password value={password} onChangeText={handlePasswordChange} />

                </>
              )}

              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  handleSubmit();
                  handleLogin();
                }}
                className="w-64 h-10 mt-6 flex-row bg-zinc-300  items-center justify-center   border rounded-full"
              >
                <Text className="text-black text-xl font-regular">Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigate("login");
                }}
                className="w-64 h-10 mt-6 flex-row   items-center justify-center mb-8  border rounded-full"
              >
                <Text className="text-zinc-300 text-xl font-regular underline">
                  Já tenho uma conta
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
  )}