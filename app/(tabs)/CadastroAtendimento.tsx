import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export default function RegisterScreen() {
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [dthoraAgendamento, setDthoraAgendamento] = useState('');
  const [horario, setHorario] = useState('');
  const [fkUsuarioId, setFkUsuarioId] = useState('');
  const [fkServicoId, setFkServicoId] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!dataAtendimento || !dthoraAgendamento || !horario || !fkUsuarioId || !fkServicoId) {
        Alert.alert('Erro', 'Todos os campos são obrigatórios.');
        return;
      }

      const formattedDataAtendimento = new Date(dataAtendimento).toISOString();
      const formattedDthoraAgendamento = new Date(dthoraAgendamento + 'T' + horario).toISOString();

      const newAgendamento = {
        dataatendimento: formattedDataAtendimento,
        dthoraagendamento: formattedDthoraAgendamento,
        horario,
        fk_usuario_id: parseInt(fkUsuarioId),
        fk_servico_id: parseInt(fkServicoId),
      };

      const response = await axios.post(`${API_URL}/agendamento/inserir`, newAgendamento, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', response.data.message);
        router.push('/Login');
      }

      setDataAtendimento('');
      setDthoraAgendamento('');
      setHorario('');
      setFkUsuarioId('');
      setFkServicoId('');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || `Erro: ${error.message}`;
        Alert.alert('Erro', errorMessage);
        console.error('Erro detalhado do Axios:', error.response?.data);
      } else if (error instanceof Error) {
        console.error('Erro ao adicionar agendamento:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo acima do nome */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/Elysium.png')} style={styles.image} />
        <Text style={styles.brand}>Elysium Beauty</Text>
      </View>

      <Text style={styles.title}>Adicionar Agendamento</Text>

      <TextInput
        label="Data Atendimento"
        mode="outlined"
        value={dataAtendimento}
        onChangeText={setDataAtendimento}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        label="Data Agendamento"
        mode="outlined"
        value={dthoraAgendamento}
        onChangeText={setDthoraAgendamento}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        label="Horário"
        mode="outlined"
        value={horario}
        onChangeText={setHorario}
        style={styles.input}
        placeholder="HH:mm:ss"
      />
      <TextInput
        label="ID Usuário"
        mode="outlined"
        value={fkUsuarioId}
        onChangeText={setFkUsuarioId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="ID Serviço"
        mode="outlined"
        value={fkServicoId}
        onChangeText={setFkServicoId}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D2B48C',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  brand: {
    fontSize: 28,
    fontFamily: 'Abang',
    color: '#5D4037',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Abang',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3e2723',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#A67B5B',
  },
  buttonText: {
    fontFamily: 'Abang',
    fontSize: 18,
    color: 'white',
  },
});
