import { Card } from "@components/CardCount";
import { FlatList, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { Container, Header, Button, ConatonerHeader, ContainerList, Text } from './styles';
import { useCallback, useEffect, useState } from "react";
import { Group } from "@components/Group";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

interface ScoreApi {
  pagination:{
    page: number;
    take: number;
    total: number;
    totalPages: number;
 }, 
 scores: [
  {
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
 ]
};

interface Scores {
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


// const dataExample = [
//   {
//     id: '1',
//     type: 'Local',
//     name: 'Desmame',
//     lote: '25813',
//     startData: '23/01/2024',
//     farm_received: {
//       name: 'granja t'
//     },
//     farm_sender: {
//       name: 'granja y'
//     },
//     weight: 1200,
//     total: 650,
//     status: 'finalized'
//   },
//   {
//     id: '2',
//     type: 'Local',
//     name: 'Desmame',
//     lote: '25813',
//     startData: '23/01/2024',
//     farm_received: {
//       name: 'granja u'
//     },
//     farm_sender: {
//       name: 'granja o'
//     },
//     weight: 1200,
//     total: 650,
//     status: 'finalized'
//   },
//   {
//     id: '3',
//     type: 'Recebimento',
//     name: 'Desmame',
//     lote: '25813',
//     farm_received: {
//       name: 'granja p'
//     },
//     farm_sender: {
//       name: 'granja t'
//     },
//     startData: '23/01/2024',
//     weight: 1200,
//     total: 650,
//     status: 'happening'
//   }
// ]

const groups = ['Local', 'Recebimento', 'Enviados']

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [groupSelected, setGroupSelected] = useState('Local')
  const [loadingScore, setLoadingScore] = useState(false)
  const [loadingValidate, setLoadingValidate] = useState(false)
  const [scores, setScores] = useState<Scores[]>()
  const { user } = useAuth()

  function handleOpenScoreDetails(scoreId: string) {
    if (scoreId) {
      navigation.navigate('score', { scoreId });
    }
  }

  const handleGetScores = useCallback(() => {
    try {
      setLoadingScore(true)
      if(groupSelected === 'Recebimento') {
        api.get<ScoreApi>(`/scores/filter?producer_id_received=${user.id}&take=999&page=1`).then((res) => {
          setScores(res.data.scores)
        })
      }
      if(groupSelected === 'Local') {
        api.get<ScoreApi>(`/scores/filter?producer_id_internal=${user.id}&take=999&page=1`).then((res) => {
          setScores(res.data.scores)
        })
      }
      if(groupSelected === 'Enviados') {
        api.get<ScoreApi>(`/scores/filter?producer_id_sender=${user.id}&take=999&page=1`).then((res) => {
          setScores(res.data.scores)
        })
      }
    } catch (e) {

    } finally {
      setLoadingScore(false)
    }
  }, [groupSelected])

  async function handleValidateScores() {
    try {
      setLoadingValidate(true)
      handleGetScores()
      setTimeout(async () => {
        await api.get('/scores/validate')
        setLoadingValidate(false)
      }, 3000)

    } catch(err) {
      console.log('Error', err)
      setLoadingValidate(false)
    } 
  }

  useFocusEffect(
    useCallback(() => {
      handleValidateScores();
    }, [])
  );


  return (
    <>
      <ConatonerHeader>
        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
        <Button
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          > 
         <Ionicons name="menu" size={25} color='white' />
        </Button>
        <Header>
          Suas contagens
        </Header>
          </View>
       <Button disabled={loadingValidate} onPress={() => handleValidateScores()}>
       <Ionicons name="reload" size={25} color={loadingValidate ? 'gray' : 'white'} />
       </Button>
      </ConatonerHeader>
      <ContainerList>

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: '#202024'}}
  
      />
      </ContainerList>

      <Container>
        {scores?.length === 0 ? (
          <Text>
            Sem contagem por enquanto!
          </Text>
        ) : (
          <>
          <FlatList
          data={scores}
          contentContainerStyle={{ justifyContent: 'center', padding: 15 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => {
            return (
              <>
                <Card key={item.item.id} data={item.item} handleNavigationScore={handleOpenScoreDetails} groudSelected={groupSelected} />
              </>
            )
          }}
        />
        </>
        )}
       

      </Container>
    </>
  )
}