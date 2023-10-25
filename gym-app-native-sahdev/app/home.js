import * as React from "react";
import { View, StyleSheet, Button, Text, ImageBackground } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Octicons';
import axios from "axios";

export default function Home() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [profile, setProfile] = React.useState({});
  
  React.useEffect(()=>{
    (async function() {
      const token = await AsyncStorage.getItem('access')

    axios.get('https://gymproject-404a72ac42b8.herokuapp.com/account/profile/',{
      headers: {
        Authorization:
          `Bearer ${token}`,
      }})
      .then((res)=>{
        console.log(res.data)
        setProfile(res.data);
      })
    })()
  },[])
  return (
    <View style={styles.container}>
    <ImageBackground source={{uri: 'https://w0.peakpx.com/wallpaper/782/831/HD-wallpaper-power-black-design-fitness-gorilla-gym-iphone-samsung-white.jpg'}} style={{ flex: 1, 
    justifyContent: "center",
  }}>
      {profile?.gym_membership &&
      <><TouchableOpacity style={styles.card}
      onPress={()=>router.push('/bmiCalculator')}
      >
        <Text style={styles.text}>DIET PLANS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}
      onPress={()=>router.push('/videos')}
      >
      <Text style={styles.text}>GYM VIDEOS</Text>
      </TouchableOpacity></>}
      
      <TouchableOpacity style={styles.card}
      onPress={()=>{router.push('/products')}}
      >
      <Text style={styles.text}>PRODUCTS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{...styles.card, height: 60, marginHorizontal: 70}}
      onPress={()=>{AsyncStorage.clear(); router.replace('/')}}
      >
      <Text style={{...styles.text, color: 'red'}}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:'flex-end', marginTop: 30 ,justifyContent: 'center', alignItems: 'center',width: 50, height: 50, borderRadius: 50, backgroundColor: 'lightblue', marginRight: 20}} onPress={()=>router.push('/message')}>
        {/* <Text style={{fontWeight: "600"}}>
        Bot
      </Text> */}
              <Icon name="dependabot" size={20}/>

      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#ecf0f1",
  },
  card: {
    // backgroundColor: 'lightgrey',
    // opacity: .1,
textAlign:'center',
display:'flex',
justifyContent:'center',
alignItems:'center',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 150
  },
  text:{
    color: 'white',
    fontSize:25,
    fontWeight: 'bold'
  }
});