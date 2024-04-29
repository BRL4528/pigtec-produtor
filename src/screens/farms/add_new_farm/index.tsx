import { Text, View } from "react-native";
import { Container, Button, SectionTop, ButtonBack, TextButton } from "./styles";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@components/Input";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from '@hooks/useAuth';
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "@components/Loading";

type FormData = {
  name: string;
  nickname: string;
}
type RouteParamsProps = {
  nameFarm: string;
  nicknameFarm: string;
  id: string;
};

export function AddNewFarm() {
  const routes = useRoute();
  const { nameFarm, nicknameFarm, id } = routes.params as RouteParamsProps;
  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [loading, setLoading] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const { control, handleSubmit, formState: { errors, defaultValues } } = useForm<FormData>({
    reValidateMode: 'onChange',
    defaultValues: useMemo(() => {
      return {
        name: nameFarm,
        nickname: nicknameFarm
      }
    }, [])
  });


  function handleSubmitNewFarm({ name, nickname }: FormData) {
    try {
      setLoading(true)
      if(name === '' || nickname === '') {
        return AppError
      }

      if (id !== '' && (name !== nameFarm || nickname !== nicknameFarm)) {
        console.log('teste')
        api.put(`/farms?id=${id}`, {
          name,
          nickname,
        })
        navigation.navigate('farms')

        return
      }
      console.log('Salvar', {name, nickname, id})
      api.post('/farms', {
        name,
        nickname,
        producer_id: user.id 
      })
      navigation.navigate('farms')
    } catch (err) {
     console.log('error', err)
    } finally {
      setLoading(false)
    }
  }

  function handleDeleteFarm() {
    try {
      setLoadingDel(true)
      if (id !== '') {
        api.delete(`/farms?id=${id}`)
        navigation.navigate('farms')

        return
      }
    } catch (err) {
      console.log('error', err)
    } finally {
      setLoadingDel(false)
    }
  }

  return (
    <Container>
      <SectionTop>
        <ButtonBack onPress={() => navigation.navigate('farms')}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </ButtonBack>
        <View />
      </SectionTop>

      <Controller
        control={control}
        name="name"
        rules={{ required: "Informe o nome de sua granja" }}
        render={({ field: { onChange } }) => (
          <Input
            titleInput="Nome de sua granja"
            onChangeText={onChange}
            defaultValue={defaultValues?.name}
          />
        )}
      />
      <Controller
        control={control}
        name="nickname"
        rules={{ required: "Informe um apelido para sua granja" }}
        render={({ field: { onChange } }) => (
          <Input
            titleInput="Apelido para granja"
            onChangeText={onChange}
            defaultValue={defaultValues?.nickname}
          />
        )}
      />
      <Button onPress={handleSubmit(handleSubmitNewFarm)} disabled={loading}>
      {loading ? (
            <Loading />
          ) : (
            <TextButton>Salvar</TextButton>
          )}
        
      </Button>
      {id !== '' && (
        <Button onPress={() => handleDeleteFarm} disabled={loading} delete>
        {loading ? (
              <Loading />
            ) : (
              <TextButton>Excluir</TextButton>
            )}
          
        </Button>
      )}
    </Container>
  )
}