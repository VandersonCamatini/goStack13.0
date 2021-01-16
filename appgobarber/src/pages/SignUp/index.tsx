import React, { useRef, useCallback } from "react";
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from "../../components/Input";
import Button from "../../components/Button";

import logoImg from "../../assets/logo.png";

import { Container, Title, BackToSignInButton, BackToSignInText } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
          formRef.current?.setErrors({});
    
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .email('Digite um e-mail válido')
              .required('E-mail obrigatório'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          });
    
          await schema.validate(data, {
            abortEarly: false,
          });
    
          // await api.post('/users', data);
    
          // history.push('/');
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
    
            formRef.current?.setErrors(errors);
    
            return;
          }
    
          Alert.alert(
            'Erro no cadastro',
            'Ocorreu um erro ao fazer cadastro, tente novamente.',
          );
        }
      }, []);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex:1 }}
                >
                    <Container>
                        <Image source={logoImg}/>

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignUp}>

                            <Input 
                                name="name" 
                                icon="user" 
                                placeholder="Nome"
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={ () =>{
                                    emailInputRef.current?.focus();
                                }}
                            />

                            <Input 
                                ref={emailInputRef}
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={ () =>{
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input 
                                ref={passwordInputRef}
                                name="password" 
                                icon="lock" 
                                placeholder="Senha"
                                secureTextEntry
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={ () => formRef.current?.submitForm() }
                            />

                            <Button onPress={() => formRef.current?.submitForm() }>Cadastrar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignInButton onPress={() => {navigation.goBack()}}>
                <Icon name="log-in" size={20} color="#ff9000"/>
                <BackToSignInText>Volte para o login</BackToSignInText>
            </BackToSignInButton>
        </>
    );
};

export default SignIn;