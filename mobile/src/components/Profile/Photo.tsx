import { User } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";

import * as ImagePicker from 'expo-image-picker';

import { S3,} from 'aws-sdk';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode'
import { api } from "../../lib/axios";

import { ACCESS_KEY, ACCESS_SECRET_KEY, BUCKET_NAME } from "@env";

import { useFocusEffect, } from '@react-navigation/native';
import React from "react";


interface DecodedToken {
  id: string;
  name: string;
  imagepath:string;
}

export function Photo() {
  const s3 = new S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: ACCESS_SECRET_KEY,
    region: 'sa-east-1',
  });

  const [image, setImage] = useState('');
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const [user, setUser] = useState({ nome: '' });


  useFocusEffect(
    React.useCallback(() => {
      async function carregarUsuario() {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          return;
        }

        const decodeToken = jwt_decode(token ?? '') as DecodedToken
        const userId = decodeToken.id

        try {
          const response = await api.get(`/users/${userId}`, {});
          setUser(response.data);
          setImage(response.data.imagepath);
        } catch (error) {
          console.error('erro aqui');
        }
      }
      carregarUsuario();
    }, [])
  );

    const imageName = `perfil_${new Date().getTime()}.jpg`;

    async function uploadImageToS3(image :string) {
      const response = await fetch(image);
      const blob = await response.blob();


      const imagePath = `${user.nome}/${imageName}`;

      const params = {
        Bucket: BUCKET_NAME,
        Key: imagePath,
        ContentType: 'image/jpeg',
        Body: blob,
        ACL: 'public-read',
      };
      const result = await s3.upload(params).promise();
      return { imagePath };
    }


async function handlePickImage() {

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();

    if (blob.size <= MAX_IMAGE_SIZE) {
      const imageUrl = await uploadImageToS3(result.assets[0].uri);

      const token = await AsyncStorage.getItem('userToken');
      const decodeToken = jwt_decode(token ?? '') as DecodedToken
      const userId = decodeToken.id

      try {
        const response = await api.put(`/users/${userId}`, {
          imagepath: result.assets[0].uri ,
        });
        setImage(result.assets[0].uri)
        console.log('Perfil do usuário atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar o perfil do usuário:', error);
      }

      console.log('Imagem enviada para o AWS S3:', imageUrl);

    } else {
      alert(`A imagem selecionada excede o tamanho máximo permitido de ${MAX_IMAGE_SIZE/(1024*1024)} MB.`);
    }
  }
}


  return (
    <TouchableOpacity
    onPress={handlePickImage}
    >
      <View className="bg-slate-300 w-2 h-10 border rounded-full justify-center items-center mr-9">
        {image ? (
          <Image source={{ uri: image }} style={{ width: 53, height: 53, borderRadius:26 }} />
        ) : (
          <User size={27} color="#0b0b0b" weight="thin" />
        )}
      </View>
    </TouchableOpacity>
  );
}

