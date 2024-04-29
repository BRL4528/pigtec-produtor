import { useNavigation } from "@react-navigation/native";
import { Container, Text, SectionHeader, Title, SectionBody, TextNick } from "./styles";
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { AppNavigatorRoutesProps } from "@routes/app.routes";

interface Props {
  farm: {
    name: string;
    nickname: string;
    id: string;
  }
}

export function CardFarm({ farm }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <Container onPress={() =>  navigation.navigate('farm_edition', { nameFarm: farm.name, nicknameFarm: farm.nickname, id: farm.id })}>
      <SectionHeader>
        <MaterialCommunityIcons name="pig-variant-outline" size={30} color="white" />
        <Title>{farm.name}</Title>
        
      </SectionHeader>
      <SectionBody>
        <Text>Apelido:</Text>
        <TextNick>{farm.nickname}</TextNick>
      </SectionBody>
    </Container>
  )
}