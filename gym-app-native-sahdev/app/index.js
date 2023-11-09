import { Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Onboarding from '../components/onboarding';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter, router  } from 'expo-router';



export default function Login() {
 
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [roleSignin, setRoleSignin] = useState('');
  const navigation = useRouter();


  const validatePassword = (password) => {
    return password.trim().length > 2;
  };

  const handleChangeEmailOrMobile = (email) => {
    setEmailOrMobile(email);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  };

  const handleKeyPress = async () => {
    alert({ emailOrMobile, password });
    Keyboard.dismiss();

 
  };

  const handleSignUp = () => {
    // navigation.push('/login');
    router.replace('/registerAll');

  };

  useEffect(() => {
    (async function(){
      const token = await AsyncStorage.getItem('access')
      axios.get('https://gymproject-404a72ac42b8.herokuapp.com/account/profile/',{
      headers: {
        Authorization:
          `Bearer ${token}`,
      }})
      .then((res)=>{
        console.log(res.data)
        router.replace('/home')
      })
      .catch((err)=>{
        console.log(err)
      })
    })()
    
  }, [])
  
  const login=()=>{
    axios.post('https://gymproject-404a72ac42b8.herokuapp.com/account/login/',{
      "email":emailOrMobile,
      "password":password
    })
    .then(async (res)=>{
      console.log(res.data)
      await AsyncStorage.setItem('access',res.data?.tokens?.access)
      await AsyncStorage.setItem('gym_membership',String(res.data?.tokens?.gym_membership))
      await AsyncStorage.setItem('refresh',res.data?.tokens?.refresh)
      router.replace('/home')

      
    })
    .catch((err)=>{
      console.log(err?.response?.data)
      const qwe= err?.response?.data;
      alert(Object.keys(qwe)?.[0]+":"+Object.values(qwe)?.[0])
    })
  }

  return (<>
    <Onboarding
      title={<View >
        <Text style={{fontSize: 30, color: 'purple'}}>

      Gym Management
        </Text>
      <Text style={{fontSize:20, marginTop: 80, fontWeight: 800}}>Sign in</Text>
      </View>}
      buttonText="Sign In"
      handleKeyPress={login}
      Component={
        <React.Fragment>
          <Text style={styles.info}>Please enter below details to continue</Text>

          <Text style={styles.labelText}>Email</Text>

          <TextInput
            style={ styles.textInput }
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            value={emailOrMobile}
            onChangeText={(value) => handleChangeEmailOrMobile(value)}
            placeholder={'davis@gmail.com'}
          />

          <Text style={styles.labelText}>Password</Text>

          <TextInput
            style={ styles.textInput }
            value={password}
            onChangeText={(value) => handleChangePassword(value)}
            placeholder={'*****'}
            secureTextEntry
            autoCorrect={false}
          />
          <Text style={styles.noAcc}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={handleSignUp}>
              <Text  style={styles.signUp}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Text>
        </React.Fragment>
      }
      // handleKeyPress={handleKeyPress}
      buttonDisabled={
        emailOrMobile.trim().length < 3 ||
        password.trim().length < 3 
      }
      isMinimumPaddingTop
    />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    fontWeight: '700',
    color: 'purple',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'purple',
  },
  textInputErrorOverride: {
    borderWidth: 1,
    borderColor: 'red',
  },
  info: {
    color: 'gray',
    marginTop: 10,
    left: 5,
    top: -15,
    fontSize: 15,
  },
  signUp: {
    color: 'purple',
    top: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  noAcc: {
    // zIndex: 1,
    color: 'gray',
    // marginTop: ,
    // left: 30,
    // justifyContent: 'center',
    // marginLeft: 20,
    // top: -15,
    fontSize: 15,
  },
  labelText: {
    color: 'gray',
    marginVertical: 10,
    left: 5,
  },
  errorView: {
    flexDirection: 'row',
    marginTop: 5,
    left: 5,
    opacity: 0,
    alignItems: 'center',
  },
  errorViewAppearOverride: {
    opacity: 1,
  },
  errorInfo: {
    color: 'red',
    marginLeft: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
