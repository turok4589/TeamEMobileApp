import { Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Onboarding from '../components/onboarding'
import { ScrollView } from 'react-native';
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router';

export default function Registeration({ navigation }) {
  /*
  use this credentials to login {
    "emailOrMobile": "anas.ansal10@gmail.com",
    "password":"123456"
    }
   */
  const params = useLocalSearchParams();
  const { post } = params;
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [roleSignin, setRoleSignin] = useState(post);


  const validatePassword = (password) => {
    return password.trim().length > 2;
  };
  

  const handleChangeEmail = (email) => {
    setEmail(email);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  };

  const handleKeyPress = async () => {
    Keyboard.dismiss(); 
  };

  const handleSignUp = () => {
setRoleSignin(roleSignin==='Fitness'?'Membership':'Fitness')
};

const register=()=>{
  if(password.trim()!==confirmpassword.trim()) {
    alert('passwords do not match')
  }
  axios.post('https://gymproject-404a72ac42b8.herokuapp.com/account/register/',{
    "name":fullName,
    "phone_no":mobile,
    "email":email,
    "password":password,
    "gym_membership":roleSignin==='Membership'?true:false
  })
  .then((res)=>{
    console.log(res.data)
    alert('signup successful')
    router.replace('/');

  })
  .catch((err)=>{
    console.log(err)
    const qwe= err?.response?.data;
    alert(Object.keys(qwe)?.[0]+":"+Object.values(qwe)?.[0])

  })
}
  return (
    <Onboarding
      title={<>
      <Text style={{color: 'purple'}}>
        {roleSignin}
      </Text>
      </>}
      buttonText="Sign Up"
      Component={
        <React.Fragment>
                      
                      <TouchableOpacity onPress={()=>router.push('/registerAll')} style={styles.noAcc}>
              <Text  style={styles.signUp}>
{'<-Back'}              </Text>
            </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:100}}>

          <Text style={styles.info}>Please enter below details to continue</Text>


          <Text style={styles.labelText}>Full name</Text>

<TextInput
  style={ styles.textInput }
  autoCapitalize={'none'}
  value={fullName}
  onChangeText={(value) => setFullName(value)}
  placeholder={'Name'}
/>

<Text style={styles.labelText}>Phone No.</Text>

<TextInput
  style={ styles.textInput }
  autoCapitalize={'none'}
  keyboardType={'phone-pad'}
  value={mobile}
  onChangeText={(value) => setMobile(value)}
  placeholder={'1231231231'}
/>
          <Text style={styles.labelText}>Email</Text>

<TextInput
  style={ styles.textInput }
  autoCapitalize={'none'}
  keyboardType={'email-address'}
  value={email}
  onChangeText={(value) => handleChangeEmail(value)}
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

          <Text style={styles.labelText}>Confirm Password</Text>

          <TextInput
            style={ styles.textInput }
            value={confirmpassword}
            onChangeText={(value) => setConfirmPassword(value)}
            placeholder={'*****'}
            secureTextEntry
            autoCorrect={false}
          />
          

  </ScrollView>
        </React.Fragment>
      }
      handleKeyPress={register}
      buttonDisabled={
        email.trim().length < 3 ||
        password.trim().length < 3 || 
        mobile.trim().length< 10 ||
        password.length<3 ||
        password!==confirmpassword
      }
      isMinimumPaddingTop
    />
  );
}

const styles = StyleSheet.create({
  textInput: {

    fontSize: 18,
    fontWeight: '700',
    color: 'purple',
    // backgroundColor: 'Gray',
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
    fontSize: 15,
    fontWeight: 'bold',
    // marginBottom:20,
    marginVertical:20
  },
  noAcc: {
    // zIndex: 1,
    color: 'gray',
    // marginBottom:100,
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
