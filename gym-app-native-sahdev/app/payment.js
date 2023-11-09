import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaymentGateway = () => {
  const params = useLocalSearchParams();
  const { amt } = params;
  const [payment, setPayment] = useState({
    price: amt??'',
    subscription: 'monthly',
    card_no: '',
    expiry_date: '',
    cvv: ''
  })
  const pay=async()=>{
    console.log(1111)
    const token = await AsyncStorage.getItem('access')
    axios.get('https://gymproject-404a72ac42b8.herokuapp.com/ecomerce/order/', {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then(resp=>{
      console.log(resp)
      const order = [];
      resp.data.map((val)=>{
        order.push(val.id);
      })


      axios.post('https://gymproject-404a72ac42b8.herokuapp.com/ecomerce/payment/', {
      ...payment,
      order: String(order)
    },{
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((res)=>{
      console.log(res.data)
      alert('Payment successful')
      axios.delete('https://gymproject-404a72ac42b8.herokuapp.com/ecomerce/order/', {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
    .then((res)=>{
      router.replace('/home')
    })
    .catch((err)=>{
      console.log(err)
    })
    
    })
    .catch((err)=>{
      console.log(err)
  
    })
      console.log(order)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Gateway</Text>
      <Image source={{uri:'https://profitbooks.net/wp-content/uploads/2020/01/razorpay-logo.png'}} style={{width: '100%', height: 100}} width={300} height={300}/>
      <Text style={styles.label}>Card Number</Text>
      <TextInput style={styles.input} placeholder="0000 0000 0000" value={payment.card_no} onChangeText={(e)=>{
        setPayment({
        ...payment,
        card_no: String(e).length<=12?e:payment.card_no
         })}}
         keyboardType="numeric"
         />
      <Text style={styles.label}>Expiry Date</Text>
      <TextInput style={styles.input} placeholder="00/00/0000" value={payment.expiry_date} onChangeText={(e)=>setPayment({
        ...payment,
        expiry_date: String(e).length<=6 ?e:payment.expiry_date
        })}
        keyboardType="numeric"
        />
      <Text style={styles.label}>CVV</Text>
      <TextInput style={styles.input} placeholder="000" value={payment.cvv} secureTextEntry={true} onChangeText={(e)=>setPayment({
        ...payment,
        cvv: String(e).length<=3 ?e:payment.cvv
        })}
        keyboardType="numeric"
        />
      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} placeholder="100" value={payment.price} onChangeText={(e)=>{
        if(!amt)
        setPayment({
        ...payment,
        price: String(e).length<=8 ?e:payment.price
        })}}
        keyboardType="numeric"
        />
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>pay()}>
        <Text style={{ color: '#fff' }}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 10,
    marginHorizontal: -20,
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    backgroundColor: '#4287f5'
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
    fontWeight: '600'
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    fontWeight: '600'
  },
  buttonContainer: {
    backgroundColor: '#4287f5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
});

export default PaymentGateway;
