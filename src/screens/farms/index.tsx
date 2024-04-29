import { FlatList, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { Container, Header, Button, ConatonerHeader, ConatonerInHeader } from './styles';
import { CardFarm } from "@components/CardFarm";
import { useCallback, useEffect, useState } from "react";
import { api } from "@services/api";
import { Loading } from "@components/Loading";

interface Farms {
  name: string;
  nickname: string;
  id: string
}

export function Farms() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [farms, setFarms] = useState<Farms[]>();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getFarms()
    }, [])
    )

  function getFarms() {
    try {
      setLoading(true)
      api.get('/farms').then((res) => {
        setFarms(res.data)
      })
     } catch (err) {
       console.log('error')
     } finally {
      setLoading(false)
     }
  }


  return (
    <>
      <ConatonerHeader>
          <ConatonerInHeader>

          <Button
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
            <Ionicons name="menu" size={25} color='white' />
          </Button>
          <Header>
            Suas granjas
          </Header>
            </ConatonerInHeader>
   

        <Button
          onPress={() =>  navigation.navigate('farm_edition', { nameFarm: '', nicknameFarm: '', id: '' })}
        >
          <Ionicons name="add" size={25} color='white' />
        </Button>
      </ConatonerHeader>
      <Container>
        {loading ? (
          <Loading />
        ): (
          <>
          <FlatList
          data={farms}
          contentContainerStyle={{ justifyContent: 'center', padding: 15 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => {
            return (
              <>
                <CardFarm farm={item.item}/>
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