import { Text } from 'react-native';
import { Container, Title } from './styled';
import { useAuth } from '@hooks/useAuth';

export function Header({title}: any) {
  const { signOut } = useAuth()
  function SignUp() {
    signOut()
  }
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}