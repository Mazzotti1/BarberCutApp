import { User } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet, Platform, Alert } from "react-native";
import RNFS from 'react-native-fs';
import { api } from "../../lib/axios";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Photo() {

  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
 const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });

  if (!result.canceled) {
    if (result.assets[0].height > MAX_IMAGE_SIZE) {
      Alert.alert(
        'Erro ao selecionar imagem',
        `O tamanho máximo permitido é de ${MAX_IMAGE_SIZE / (1024 * 1024)} MB`
      );
      return;
    }
    const imageUri = result.assets[0].uri;
    setImage(imageUri);
    try {
      await AsyncStorage.setItem('imageUri', imageUri);
    } catch (e) {
      console.log('Error saving image URI:', e);
    }
  }
};

 const loadImageUriFromStorage = async () => {
   try {
     const imageUri = await AsyncStorage.getItem('imageUri');
     if (imageUri !== null) {
       setImage(imageUri);
     }
   } catch (e) {
     console.log('Error loading image URI:', e);
   }
 };
 useEffect(() => {
   loadImageUriFromStorage();
 }, []);

  return (
    <TouchableOpacity
    onPress={pickImage}
    >
      <View className="bg-slate-300 w-10 h-10 border rounded-full justify-center items-center mr-5">
        {image ? (
          <Image source={{ uri: image }} style={{ width: 53, height: 53, borderRadius:26 }} />
        ) : (
          <User size={27} color="#0b0b0b" weight="thin" />
        )}
      </View>
    </TouchableOpacity>
  );
}


