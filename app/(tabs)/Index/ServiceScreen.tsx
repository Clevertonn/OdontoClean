import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ServiceItemProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description: string;
}

const ServicesScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* 🔹 Degradê no topo */}
      <LinearGradient
        colors={['#3871c1', 'transparent']}
        style={styles.gradientTop}
        pointerEvents="none"
      />
       

        <View style={styles.serviceContainer}>
          <ServiceItem icon="toothbrush" title="Limpeza e Prevenção" description="Inclui profilaxia dental, aplicação de flúor, raspagem de tártaro e orientações sobre higiene bucal." />
          <ServiceItem icon="tooth-outline" title="Clareamento Dental" description="Procedimento estético para remoção de manchas e branqueamento dos dentes." />
          <ServiceItem icon="swap-vertical" title="Implantes Dentários" description="Substituição de dentes perdidos por implantes de titânio que servem como raízes artificiais." />
          <ServiceItem icon="medical-bag" title="Tratamento de Canal" description="Procedimento endodôntico para tratar infecções ou inflamações na polpa do dente." />
          <ServiceItem icon="tooth" title="Próteses Dentárias" description="Reabilitação com coroas, pontes ou dentaduras para restaurar a função mastigatória e estética." />
          <ServiceItem icon="toothbrush-paste" title="Lentes de Contato" description="Procedimento odontológico que pode melhorar significativamente a aparência e a saúde bucal dos pacientes." />
        </View>

        <View style={styles.heading}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const ServiceItem = ({ icon, title, description }: ServiceItemProps) => {
  return (
    <View style={styles.serviceItem}>
      <MaterialCommunityIcons name={icon} size={40} color="#008cce" style={styles.icon} />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3871c1',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceContainer: {
    marginTop: 10,
  },
  serviceItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3871c1',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default ServicesScreen;
