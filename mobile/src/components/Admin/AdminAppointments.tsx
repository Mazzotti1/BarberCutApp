
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native"



import { useEffect, useState, } from "react";


import { useIsFocused } from "@react-navigation/native";

import { api } from "../../lib/axios";
import {format} from 'date-fns'
import { XCircle } from "phosphor-react-native";



interface Agendamento {
  id: string;
  barber: string;
  time: string;
  date: string;
  service: string;
  username:string;
}

export function AdminAppointments() {
  const isFocused = useIsFocused()
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState('')

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const response = await api.get('/appointments')
        const agendamentosData = response.data
        setAgendamentos(agendamentosData)

      } catch (error) {
        console.log('Erro na requisição:', error)
      }
    }
    carregarAgendamentos()
  }, [isFocused])

  async function deletarAgendamento(agendamentoId: string)  {
    try {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja deletar este agendamento?',
            [
                {
                    text: 'Cancelar', style: 'cancel'},
                {
                    text: 'Confirmar',
                    onPress: async () => {
                       const response = await api.delete(`/appointment/${agendamentoId}`, {});
                       setAgendamentos(agendamentos.filter(agendamentos => agendamentos.id !== agendamentoId));
                    }
                }
            ]
        );
    } catch (error) {
        console.log(error)
    }
}

function handleCloseUserInfo() {
    setShowUserInfo(false)
    setSelectedUserId('')
  }


  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1"
        style={{ backgroundColor: "#030303" }}
      >
        <View className="flex-1 mt-4">
          {agendamentos.map((agendamento) => (
            <View key={agendamento.id}>
           <TouchableOpacity
                onPress={() => {
                  if (showUserInfo && selectedUserId === agendamento.id) {
                    handleCloseUserInfo()
                  } else {
                    setSelectedUserId(agendamento.id)
                    setShowUserInfo(true)
                  }
                }}
                className="bg-zinc-900 border w-80 rounded-xl flex-row justify-between mt-2 items-center  p-4"
              >
                <View>
                  <Text className="font-regular text-white mb-2 text-lg">
                    {agendamento.username}
                  </Text>
                  <Text className="font-regular text-white text-md">{format(new Date(agendamento.date), 'dd/MM/yyyy')}</Text>

                </View>
                <Text className="text-white font-regular text-lg">Horário: {agendamento.time}</Text>
                <View className="flex-row gap-4"></View>
                <TouchableOpacity
                         onPress={() => deletarAgendamento(agendamento.id)}>
                      <XCircle size={30} color="#ededed" weight="thin" />

                    </TouchableOpacity>
              </TouchableOpacity>

                    {showUserInfo && selectedUserId === agendamento.id && (
                    <View className="p-4 border border-stone-200 rounded-lg bg-zinc-300">
                        <Text className="text-black font-regular text-lg">
                        Barbeiro: {agendamento.barber}
                        </Text>

                        <Text className="text-black font-regular text-lg">
                        Serviço: {agendamento.service}
                        </Text>

                    </View>
                    )}
                </View>
                ))}
            </View>
          </ScrollView>

      </View>
    )
}
