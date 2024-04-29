import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from '@hooks/useAuth';

export function ProfileUser() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer} >
      <Ionicons name="person" size={30} color='#adb5bd' />
      </View>

      <Text style={styles.textName}>
         {user.name}
      </Text>
      <Text style={styles.textEmail} numberOfLines={1}>
      {user.email}
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#7C7C8A',
    maxHeight: 180,
    marginBottom: 25
  },
  profileContainer: {
    borderRadius: 50,
    padding: 15,
    borderColor: '#319795',
    borderWidth: 1,
    marginBottom: 10
  },
  textName: {
    color: '#E1E1E6',
    fontSize: 18,
  },
  textEmail: {
    color: '#C4C4CC',
    fontSize: 16,
    marginTop: 5,

  }
});