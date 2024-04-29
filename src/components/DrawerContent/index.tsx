import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProfileUser } from './profile';
import { Footer } from './footer';

export const DrawerContent = ({ navigation }: any) => {
  return (
      <>
    <View style={styles.container}>
      <ProfileUser />
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('home')}>
        <Text style={styles.text}>Suas contagens</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('farms')}>
        <Text style={styles.text}>Suas granjas</Text>
      </TouchableOpacity>
      {/* Adicione mais itens de menu conforme necessário */}
    </View>
    <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#29292E',
  },
  drawerItem: {
    marginBottom: 20,
  },
  text: {
    color: '#E1E1E6',
    fontSize: 18
  }
});

export default DrawerContent;
