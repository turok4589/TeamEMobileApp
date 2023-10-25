import * as React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterAll() {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register using</Text>
      <TouchableOpacity style={styles.card}
      onPress={()=>router.push({
        pathname: "/register", params: { post: "Membership" }
      })}
      >
        <Text style={styles.text}>Membership</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}
      onPress={()=>router.push({
        pathname: "/register", params: { post: "Fitness" }
      })}
      >
      <Text style={styles.text}>Fitness</Text>
      </TouchableOpacity>

<Text style={styles.noAcc}>
            Already a user?{' '}
            <TouchableOpacity onPress={()=>router.replace('/')}>
              <Text  style={styles.signUp}>
                Sign in
              </Text>
            </TouchableOpacity>
          </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  card: {
    backgroundColor: 'purple',
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
  heading: {
    textAlign:'center',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:24,
        padding: 10,
        margin: 10,
        height: 150
  },
  text:{
    color: 'white',
    fontSize:25,
    fontWeight: 'bold'
  },
  signUp: {
    color: 'purple',
    top: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  noAcc: {
    color: 'gray',
    fontSize: 15,
  },
});