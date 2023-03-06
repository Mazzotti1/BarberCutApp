


import { StatusBar } from 'react-native';

import {
  useFonts,
  Abel_400Regular,
} from '@expo-google-fonts/abel';

import { Loading } from './src/components/Utils/Loading';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }


  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" translucent />
    </>
  );
}
