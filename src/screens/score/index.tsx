import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  ContainerFlag,
  SectionFlag,
  SectionList,
  TextCount,
  TextFlag,
  SectionVideo,
  SectionHeader,
  SectionTop,
  ButtonBack,
  Loading
} from "./styles";
import { FlatList, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Header } from "../../components/Header";
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { api } from "@services/api";
import { format, intervalToDuration } from "date-fns";
import { ptBR } from 'date-fns/locale/pt-BR';

type RouteParamsProps = {
  scoreId: string;
};

type ScorePrps = {
  id: string;
  quantity: number;
  weight: number;
  duration: { hours: number; minutes: number };
  file_url: string;
  file: string;
  start_date: string;
  end_date: string;
  markings: {
    id: string;
    sequence: string;
    quantity: string;
    weight: string;
  }[];
};

interface Config {
  rout: string;
}
interface During {
  start: string;
  end: string
}


export function Score() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [score, setScore] = useState<ScorePrps>({} as ScorePrps);
  const [isLoading, setIsloading] = useState(true);
  const [loadingVideo, setLoadingVideo] = useState(true);


  const routes = useRoute();
  const { scoreId } = routes.params as RouteParamsProps;
  const video = React.useRef(null);

  async function fetchScoreDetails() {
    try {
      setIsloading(true);

      const response = await api.get<ScorePrps>(`/scores/show`, {
        params: {
          id: scoreId,
        },
      });
      response.data.markings.sort(
        (a, b) => Number(a.sequence) - Number(b.sequence)
      );
      setScore(response.data);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setIsloading(false);
    }
  }

  function formatDuring({ start, end }: During) {
    const dataFormated = intervalToDuration({
      start: start,
      end: end
    })
    let hours = '00'
    let minutes = '00'
    if(dataFormated.hours !== undefined) {
      if(dataFormated.hours > 0 && dataFormated.hours < 9) {
        hours = `0${dataFormated.hours}`
      } else {
        hours = String(dataFormated.hours)
      }
    }
    if(dataFormated.minutes !== undefined) {
      if(dataFormated.minutes > 0 && dataFormated.minutes < 9) {
        minutes = `0${dataFormated.minutes}`
      } else {
        minutes = String(dataFormated.minutes)
      }
    }
    const formated = `${hours}:${minutes} hrs`
    return formated
  }

  useEffect(() => {
    fetchScoreDetails();
  }, [scoreId]);

  function handleBack() {
    navigation.navigate('home');
  }

  const dataFormated = useMemo(() => {
    if (score.start_date) {
      return format(new Date(score.start_date), 'dd/MM/yyyy', {
        locale: ptBR
      })
    }
  }, [score])

  return (
    <>
      <Container>
        <SectionTop>
          <ButtonBack onPress={() => handleBack()}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </ButtonBack>
          <View />
        </SectionTop>
      
        <Header title={`Carga do dia ${dataFormated}`}/>
        <SectionHeader>
          <TextCount>Quantidade: {score.quantity}</TextCount>
          <TextCount>Peso total: {score.weight}kg</TextCount>
          <TextCount>Peso médio: {parseFloat((Number(score.weight)/Number(score.quantity)).toFixed(2))}kg</TextCount>
          <TextCount>
            Tempo de carga:{" "}
            {formatDuring({ start: score.start_date, end: score.end_date })}
          </TextCount>
        </SectionHeader>
      </Container>
      {score.file_url === 'not_found' ? (
        <Container>
          <TextFlag>Contagem não possue video.</TextFlag>
        </Container>
      ) : (
        <SectionVideo>
          {loadingVideo && (
            <Loading />
          )}
          <Video
            // onLoadStart={() => console.log('carregando')}
            ref={video}
            style={{
              width: 380,
              height: 280,
              alignItems: "center",
              borderRadius: 6
            }}
            source={{
              uri: `${score.file_url}`,
            }}
            shouldPlay
            useNativeControls={!loadingVideo}
            onLoad={() => setLoadingVideo(false)}
            resizeMode={ResizeMode.CONTAIN}
            
            
            // isLooping

          />
        </SectionVideo>
      )}

      <ContainerFlag>
        <SectionFlag>
          <FlatList
            keyExtractor={(item) => item.sequence}
            data={score.markings}
            ListEmptyComponent={() => (
              <TextFlag>Sem marcações para esta contagem</TextFlag>
            )}
            renderItem={(item) => (
              <>
                <TouchableOpacity>
                  <SectionList>
                    <Ionicons name="flag" size={15} color="white" />
                    <TextFlag>Marcação: {item.item.sequence}</TextFlag>
                    <TextFlag>Quantidade: {item.item.quantity}</TextFlag>
                    <TextFlag>
                      Peso: {Number(item.item.quantity) * 2.5} Kg
                    </TextFlag>
                  </SectionList>
                </TouchableOpacity>
              </>
            )}
          />
        </SectionFlag>
      </ContainerFlag>
    </>
  );
}
