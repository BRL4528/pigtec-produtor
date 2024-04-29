import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@hooks/useAuth';
import { StyleSheet, TouchableOpacity, View,Text } from "react-native";

export function Footer() {
  const { signOut } = useAuth();

  function signUpApp() {
    signOut()
  }


  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={signUpApp}>
          <Text style={styles.text}>Sair do app</Text>
          <Ionicons name="exit" size={25} color='#AA2834' />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#29292E',
  },
  button: {
    height: 56,
    borderRadius: 32,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
  },
  text: {
    color: '#AA2834',
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
  },
});