import { View, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../Utils/BackButton";

export function HeaderService() {
  const { navigate } = useNavigation()

  return (
    <View className="w-screen h-16 flex-row justify-center items-center  bg-black   ">
        <View className=" absolute left-0 ml-6">
          <BackButton  />
        </View>

        <Text className="text-white  font-regular  text-2xl">
          SHARP CUT
        </Text>

    </View>
  )
}