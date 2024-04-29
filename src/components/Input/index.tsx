import { TextInput, TextInputProps } from 'react-native';
import { InputNatite, Title } from './styles';

interface Props extends TextInputProps {
  onChangeText: (value: string) => void;
  text?: string;
  titleInput?: string;
  disabled?: boolean;
}

export function Input({ onChangeText, text, titleInput, disabled, ...rest }: Props) {
  return (
    <>
      {titleInput !== '' ? <Title>{titleInput}</Title> : ''}
      <InputNatite onChangeText={onChangeText} value={text} editable={!disabled} {...rest} />
    </>
  );
}
