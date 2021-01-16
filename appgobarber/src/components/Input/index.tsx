import React, { ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, forwardRef, useCallback, useState } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps{
    name: string;
    icon: string;
}

interface InputValueReference{
    value: string;
}

interface InputRef{
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({name, icon, ...rest}, ref) => {

    const inputElementRef = useRef<any>(null);
    const { registerField , defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue});

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() =>{
        setIsFocused(true);
    }, []);
    
    const handleInputBlur = useCallback(() =>{
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () =>({
       focus(){
           inputElementRef.current.focus();
       } 
    })) // Colocar Parenteses antes das chaves é a mesma coisa que dar um return dentro das chaves

    useEffect(() =>{
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value){
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear(); // ou inputElementRef.current.setNativeProps({ text: '' });
            }
        });
    }, [ fieldName, registerField])

    return (
        <Container isFocused={isFocused} isErrored={!!error}>
            <Icon name={icon} size={20} color={ isFocused || isFilled ? '#ff9000' : '#666360'}/>
            <TextInput 
                ref={inputElementRef}
                defaultValue={defaultValue}
                keyboardAppearance="dark" // Só funciona no IOS, no Android quem controla isso é o sistema.
                placeholderTextColor="#666360" 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) =>{
                        inputValueRef.current.value = value;
                    }
                }

                {...rest}
            />
        </Container>
    )
};

export default forwardRef(Input);