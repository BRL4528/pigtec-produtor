import { TouchableOpacityProps } from 'react-native';
import { Button, Text } from './styles';

interface Props extends TouchableOpacityProps {
  name: string;
  isActive: boolean;
}

export function Group({ isActive, name, ...rest }: Props) {
  return (
    <Button isActive={isActive} {...rest}>
      <Text isActive={isActive}>
        {name}
      </Text>
    </Button>
  )
    
}