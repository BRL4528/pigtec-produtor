import { useCallback, useState } from "react";
import { Input } from "@components/Input";
import { Container, Text, SectionForm, Image, Button, Title, TextCopyright, Footer, ImageLogo } from "./styles";
import { Controller, useForm } from 'react-hook-form';
//@ts-ignore
import Logo from '@assets/logo.png';
//@ts-ignore
import BackgroundImg from '../../assets/background.png';
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

type FormData = {
  cpf: string;
}


export function SignIn() {
  // const [cpf, setCpfUser] = useState('')
  const [loading, setLoading] = useState(false)
  const { signInUser } = useAuth();

  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();

  // const handleSignIn = useCallback(async () => {
  //   try {
  //     setLoading(true)
  //     console.log('cpf', cpf)
  //     await signInUser(cpf)
  //   } catch (err) {
  //     console.log('Error', err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [cpf])
  async function handleSignIn({ cpf }: FormData) {
    try {
      setLoading(true)
      await signInUser(cpf)
    } catch (err) {
      console.log('Error', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Container>
      <Image
        source={BackgroundImg}
        style={{ resizeMode: 'contain' }}
        />
      <ImageLogo
        source={Logo}
        
        style={{ resizeMode: 'contain' }}
        />

      
      <Text>Realise seu login</Text>
      <SectionForm>
        <Controller 
          control={control}
          name="cpf"
          rules={{ required: "Informe o e-mail!"}}
          render={({field: { onChange }}) => (
              <Input 
                titleInput="Digite seu CPF"
                onChangeText={onChange}
            />
          )}
          />
        {/* <Input onChangeText={setCpfUser} text={cpf} titleInput="Digite seu CPF" /> */}
        <Button onPress={handleSubmit(handleSignIn)}>
          {loading ? (
            <Loading />
          ) : (
            <Title>Acessar</Title>
          )}
        </Button>
      </SectionForm>
    </Container>
      <Footer>
      <TextCopyright>Copyright © 2024 Inovagrotec ®</TextCopyright>
      </Footer>
      </>
  )
}