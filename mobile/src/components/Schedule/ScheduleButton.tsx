import {useState} from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native"

import { DeviceMobileSpeaker, FacebookLogo,GoogleLogo } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSign } from '../SignIn/GoogleSign';

export function ScheduleButton(){

  const { navigate } = useNavigation()

    const [isMovedUp, setIsMovedUp] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const handlePress = () => {
      setIsMovedUp(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const handleBack = () => {
      Animated.timing(animation, {
        toValue: -1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsMovedUp(false));
    };

    return (
      <>
        {!isMovedUp && (
          <TouchableOpacity className='flex items-center' onPress={handlePress}>
            <View className='flex items-center w-40 p-3 bg-zinc-800 rounded-xl mb-10'>
              <Text className='font-regular text-slate-300 text-xl'>Buscar horários</Text>
            </View>
          </TouchableOpacity>
        )}
        {isMovedUp && (
          <>
            <TouchableWithoutFeedback onPress={handleBack}>
              <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View className='absolute  bottom-0 left-0 right-0  bg-white rounded-tl-3xl rounded-tr-3xl'
              style={[{ transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }],},
              ]}
            >
              <TouchableOpacity className='absolute h-96  bottom-0 left-0 right-0 bg-white rounded-tr-3xl rounded-tl-3xl '>
                <View className='flex items-center mt-5'>
                  <DeviceMobileSpeaker size={72} color="#0a0a0a" weight="thin" />
                  <Text className='font-regular text-black text-2xl'>Já possui uma conta?</Text>


                  <TouchableOpacity
                      className='items-center mt-4'
                      activeOpacity={0.5}
                      onPress={()=>{
                        navigate('login')
                      }}>
                    <View className='items-center p-2 w-52 rounded-xl mt-4' style={{backgroundColor:'#0a0a0a'}}>
                      <Text className='font-regular text-gray-300 text-xl'>Continuar com email</Text>
                    </View>
                    </TouchableOpacity>

                   <GoogleSign />

                    <TouchableOpacity
                      className='items-center mt-4'
                      activeOpacity={0.5}
                      onPress={()=>{
                        navigate('register')
                      }}>
                      <Text className='font-regular text-2xl ' style={{color:'#0a0a0a'}}>Cadastre-se</Text>
                      </TouchableOpacity>

                </View>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </>
    );
  }


