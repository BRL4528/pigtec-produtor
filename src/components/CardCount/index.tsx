import { Line, Svg } from "react-native-svg";
import { Container, SectionHeader, Title, SectionBody, TextItens, CardStatus } from "./styles";
import Icons from '@expo/vector-icons/AntDesign';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';

interface Props {
  groudSelected: string;
  handleNavigationScore: (event: string) => void;
  data: {
    id: string;
    start_date: string;
    weight: string;
    quantity: string;
    lote: string;
    name: string;
    type: string;
    progress: string;
    status: boolean;
    farmSender: {
      id: string;
      name: string;
    },
    farmReceived: {
      id: string;
      name: string;
    },
    farmInternal: {
      id: string;
      name: string;
    }
  }
}

export function Card({ data, handleNavigationScore, groudSelected }: Props) {

  const DashedBorder = () => {
    return (
      <Svg height="100%" width="100%" viewBox="0 0 100 100" style={{ position: 'absolute' }}>
        {/* <Line x1="0" y1="0" x2="100" y2="0" stroke="green" strokeDasharray="5,5" strokeWidth="2" /> */}
        <Line x1="-15" y1="30" x2="450" y2="30" stroke="#434349" strokeDasharray="5.5" strokeWidth="1" />
        {/* <Line x1="0" y1="0" x2="0" y2="100" stroke="green" strokeDasharray="5,5" strokeWidth="2" /> */}
        {/* <Line x1="100" y1="0" x2="100" y2="100" stroke="green" strokeDasharray="5,5" strokeWidth="2" /> */}
      </Svg>
    );
  };

  return (
    <Container onPress={() => handleNavigationScore(data.id)}>
        {data.progress === 'finalized' && data.status && (
          <CardStatus status={data.progress}>
          <Icons name="checkcircleo" size={15} color="green" />
            <Title size="sm">Finalizado</Title>
          </CardStatus>
        )}
            {data.progress === 'not_found' && data.status && (
               <CardStatus status="finalized">
               <Icons name="checkcircleo" size={15} color="green" />
                 <Title size="sm">Finalizado</Title>
               </CardStatus>
            //  <CardStatus status={data.progress}>
            //  <Icons name="exclamationcircleo" size={15} color="#e23546" />
            //    <Title size="sm">Sem video</Title>
            //  </CardStatus>
           )}
        {data.progress === 'happening' && (
          <CardStatus status={data.progress}>
          <Icons name="exclamationcircleo" size={15} color="#D69E2E" />
            <Title size="sm">Andamento</Title>
          </CardStatus>
        )}
         {data.progress === 'not_found' && !data.status && (
             <CardStatus status={data.progress}>
             <Icons name="exclamationcircleo" size={15} color="#1429a0" />
               <Title size="sm">Processando</Title>
             </CardStatus>
           )}

      <SectionHeader>
        {data.type === 'simple_count' ? (
          <Title size="sm">{data.name}</Title>
        ) : (
          <>
        <Title size="md">{data.farmSender.name}</Title>
        <Icons name="arrowright" size={20} color="white" />
        <Title size="md">{data.farmReceived.name}</Title>
          </>
        )}
      
      </SectionHeader>
        {/* <DashedBorder /> */}
      <SectionBody>
        {data.type === 'Local' && (
          <TextItens>Lote: {data.start_date}</TextItens>
        )}
        <TextItens>Dia: {
        format(new Date(data.start_date), 'dd/MM/yyyy HH:mm', {
          locale: ptBR
        })}</TextItens>
        <TextItens>Total de suinos: {data.quantity}</TextItens>
        <TextItens>Peso total: {data.weight}</TextItens>
        <TextItens>Peso Médio: {parseFloat((Number(data.weight)/Number(data.quantity)).toFixed(2))}</TextItens>
      </SectionBody>
    </Container>
  )
}