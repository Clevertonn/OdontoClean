import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import LoginScreen from './Login';
import AlterarSenhaScreen from './AlterarSenha';
import RedefinirSenhaScreen from './RedefinirSenha';



import RegistroUserScreen from './RegistroUser';
import CadastroAtendimento from './CadastroAtendimento';
import GerenciamentoUser from '../GerenciamentoUser';
import GerenciamentoAgendamento from '../GerenciamentoAgendamento';
import GerenciamentoServico from '../GerenciamentoServico';
import Relatorio from '../Relatorio';


// Telas
import HomeScreen from './index';
import AboutScreen from './Index/AboutScreen';
import ServiceScreen from './Index/ServiceScreen';
import PortfolioScreen from './Index/PortfolioScreen';
import TestimonialScreen from './Index/TestimonialScreen';
import BlogScreen from './Index/BlogScreen';
import ContactScreen from './Index/ContactScreen';
import { View } from 'react-native';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';






// Criando os navegadores
const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();
type IconName =
  | 'home'
  | 'information'
  | 'construct'
  | 'briefcase'
  | 'people'
  | 'file-tray'
  | 'call';
// Função para configurar as Tabs
const Tab = createBottomTabNavigator();

function CustomTabBarButton({ children, onPress }: { children: React.ReactNode; onPress?: (event: GestureResponderEvent) => void }) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: -20, // 🔹 Ajusta a elevação para centralizar melhor
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        backgroundColor: '#008cce',
        borderRadius: 35,
        width: 65,
        height: 65,
        shadowColor: 'white',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
      }}
     onPress={(event) => onPress?.(event)}
    >
      {children}
    </TouchableOpacity>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#3871c1',
          height: 50, // 🔹 Ajusta altura da barra
          borderTopWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 5, // 🔹 Garante espaçamento correto dos ícones
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#8ddfff',
        tabBarInactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Sobre Nós"
        component={AboutScreen}
        options={{
          headerStyle: {
            elevation: 0,
            backgroundColor: '#3871c1', // 🎨 Cor da barra superior
          },
          headerTintColor: '#fff', // 📝 Cor do texto (título)
          headerTitleAlign: 'center', // 👈 Centraliza o título
          tabBarIcon: ({ color, size }) => (
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="information-circle" size={32} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Nossos Serviços"
        component={ServiceScreen}
        options={{
          headerStyle: {
            elevation: 0,
            backgroundColor: '#3871c1', // 🎨 Cor da barra superior
          },
          headerTintColor: '#fff', // 📝 Cor do texto (título)
          headerTitleAlign: 'center', // 👈 Centraliza o título
          tabBarIcon: ({ color, size }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="construct" size={28} color={color} />
            </View>
          ),
        }}
      />

      {/* Botão Central - Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            elevation: 0,
            backgroundColor: '#3871c1', // 🎨 Cor da barra superior
          },
          headerTintColor: '#fff', // 📝 Cor do texto (título)
          headerTitleAlign: 'center', // 👈 Centraliza o título
          tabBarIcon: ({ color }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginEnd: 0, marginTop: -5}}>
              <Ionicons name="home" size={32} color={color} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Portfólio"
        component={PortfolioScreen}
        options={{
          headerStyle: {
            elevation: 0,
            backgroundColor: '#3871c1', // 🎨 Cor da barra superior
            
          },
          headerTintColor: '#fff', // 📝 Cor do texto (título)
          headerTitleAlign: 'center', // 👈 Centraliza o título
          tabBarIcon: ({ color, size }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="briefcase" size={28} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Contatos"
        component={ContactScreen}
        options={{
          headerStyle: {
            elevation: 0,
            backgroundColor: '#3871c1', // 🎨 Cor da barra superior
          },
          headerTintColor: '#fff', // 📝 Cor do texto (título)
          headerTitleAlign: 'center', // 👈 Centraliza o título
          tabBarIcon: ({ color, size }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="call" size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}



export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const [userType, setUserType] = useState<string | null>(null); // Estado do tipo de usuário
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  // Função para obter o tipo de usuário do AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('userType')
      .then((userTypeStored) => {
        console.log('userTypeStored:', userTypeStored); // Verifique o valor de userType
        setUserType(userTypeStored);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao obter userType:', error);
        setLoading(false);
      });
  }, []);

  // Exibe um carregamento até que o tipo de usuário seja obtido
  if (loading) {
    return null; // Ou renderize um componente de carregamento (ex. um spinner)
  }

  // Função para limpar os dados do AsyncStorage
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId'); // Remove o userId
    await AsyncStorage.removeItem('userName'); // Remove o userName
    await AsyncStorage.removeItem('userType'); // Remove o userType
    setUserType(null); // Limpa o estado local do userType
  };

  return (
    <DrawerNavigator.Navigator
      screenOptions={({ navigation }) => ({
        // Cor do fundo do Drawer (menu lateral)
    drawerStyle: {
      backgroundColor: '#3871c1', // Altere para a cor desejada
    },
    // Cor do texto do item ativo
    drawerActiveTintColor: '#fff',
    // Cor do texto do item inativo
    drawerInactiveTintColor: '#ccc',
    // Estilo do texto
    drawerLabelStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#3871c1', // Cor da barra superior
      elevation: 0,
    },
    headerTintColor: 'white', // Cor dos ícones/textos do header
    headerLeft: () => (
          <Pressable
            onPress={() => {
              // Verifica o userType no AsyncStorage quando o botão do menu é pressionado
              AsyncStorage.getItem('userType')
                .then((userTypeStored) => {
                  console.log('userTypeStored:', userTypeStored); // Verifique o valor de userType
                  setUserType(userTypeStored); // Atualiza o estado com o valor do userType
                  setLoading(false); // Define o estado de loading como false
                  navigation.toggleDrawer(); // Abre ou fecha o drawer
                })
                .catch((error) => {
                  console.error('Erro ao obter userType:', error);
                  setLoading(false); // Em caso de erro, ainda define o loading como false
                });
            }}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color='white' />
          </Pressable>
        ),
      })}
    >

      {/* Tela de Home que conterá o TabNavigator */}
      <DrawerNavigator.Screen
        name="Home"
        options={{
          title: 'Inicio',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="home-outline" size={28} color={color} />,
        }}
        component={Tabs} // Aqui você usa o TabNavigator diretamente
      />
      
      {userType !== '0' && userType !== '1' && (
        <>
          <DrawerNavigator.Screen
            name="Login"
            options={{
              title: 'Login',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="log-in-outline" size={28} color={color} />,
            }}
            component={LoginScreen}
          />

          <DrawerNavigator.Screen
            name="RegistroUser"
            options={{
              title: 'Cadastro de Usuário',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="person-add-outline" size={28} color={color} />,
            }}
            component={RegistroUserScreen} 
          />

      </>
)}
      {/* Condicional para gerenciar as telas, com base no tipo de usuário */}
      {userType === '0' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoUser"
            options={{
              title: 'Gerenciamento de Usuarios',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="people" size={28} color={color} />,
            }}
            component={GerenciamentoUser}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            options={{
              title: 'Gerenciamento de Agendamento',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="calendar-outline" size={28} color={color} />,
            }}
            component={GerenciamentoAgendamento}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoServico"
            options={{
              title: 'Gerenciamento de Serviço',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="construct-outline" size={28} color={color} />,
            }}
            component={GerenciamentoServico}
          />
          <DrawerNavigator.Screen
            name="Reletorio"
            options={{
              title: 'Relatorio',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="construct-outline" size={28} color={color} />,
            }}
            component={Relatorio}
          />
        <DrawerNavigator.Screen
          name="AlterarSenha"
          options={{
            title: 'Alterar Senha',
            drawerIcon: ({ color }: { color: string }) => <Ionicons name="key-outline" size={28} color={color} />,
          }}
          component={AlterarSenhaScreen} 
       />

      <DrawerNavigator.Screen
        name="RedefinirSenha"
        options={{
          title: 'Redefinir Senha',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="lock-open-outline" size={28} color={color} />,
        }}
        component={RedefinirSenhaScreen} 
      />
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="log-out-outline" size={28} color={color} />,
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType); // Verifique o estado antes de realizar a ação
                handleLogout(); // Limpa os dados de usuário do AsyncStorage
              },
            }}
            component={() => null} // Componente vazio, já que você não quer mudar de tela
          />
        </>
      )}
      
      {userType === '1' && (
        <>
          
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            options={{
              title: 'Gerenciamento de Agendamento',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="calendar-outline" size={28} color={color} />,
            }}
            component={GerenciamentoAgendamento}
          />
          <DrawerNavigator.Screen
            name="CadastroAtendimento"
            options={{
              title: 'Cadastro do Atendimento',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="person-add-outline" size={28} color={color} />,
            }}
            component={CadastroAtendimento} // Substitua pelo componente correto, caso tenha outro
          />
                <DrawerNavigator.Screen
        name="AlterarSenha"
        options={{
          title: 'Alterar Senha',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="key-outline" size={28} color={color} />,
        }}
        component={AlterarSenhaScreen} 
      />

      <DrawerNavigator.Screen
        name="RedefinirSenha"
        options={{
          title: 'Redefinir Senha',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="lock-open-outline" size={28} color={color} />,
        }}
        component={RedefinirSenhaScreen} 
      />
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }: { color: string }) => <Ionicons name="log-out-outline" size={28} color={color} />,
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType); // Verifique o estado antes de realizar a ação
                handleLogout(); // Limpa os dados de usuário do AsyncStorage
              },
            }}
            component={() => null} // Componente vazio, já que você não quer mudar de tela
          />
        </>
      )}
    </DrawerNavigator.Navigator>
  );
}
