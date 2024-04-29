import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import theme from './src/theme';
import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from '@contexts/AuthContext';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </ThemeProvider>
  );
}
