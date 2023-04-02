import { User } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

import { api } from "../../lib/axios";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export function Photo() {

  const [image, setImage] = useState('');

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {

      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (image: string) => {
    try {
      const response = await api.post('/upload', {
          path: image,
          filename: "arquivo.jpg",
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TouchableOpacity
    onPress={pickImage}
    >
      <View className="bg-slate-300 w-10 h-10 border rounded-full justify-center items-center mr-10">
        {image ? (
          <Image source={{ uri: image }} style={{ width: 45, height: 45, borderRadius:20 }} />
        ) : (
          <User size={27} color="#0b0b0b" weight="thin" />
        )}
      </View>
    </TouchableOpacity>
  );
}


