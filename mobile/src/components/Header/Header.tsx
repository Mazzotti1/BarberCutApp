import { View, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../Utils/BackButton";

export function Header() {
  const { navigate } = useNavigation()

  return (
    <View className="w-screen h-16 flex justify-center items-center  bg-black   ">

        <Text className="text-white  font-regular  text-2xl">
          SHARP CUT
        </Text>

    </View>
  )
}