import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DietPlanCard = ({ plan }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plan.morningPlanImage }} style={styles.image} />
      <Text style={styles.title}>{plan.body}</Text>
     <Text style={styles.subTitle}>Morning Plan:</Text>
      <Text style={styles.text}> {plan.morningPlan}</Text>
     <Text style={styles.subTitle}>Afternoon Plan:</Text>
      <Text style={styles.text}> {plan.afternoonPlan}</Text>
     <Text style={styles.subTitle}>Night Plan:</Text>
      <Text style={styles.text}>{plan.nightPlan}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  header:{
fontSize: 25,
marginVertical:20

},
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    marginVertical: 10,
    color: 'purple'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
    color: 'grey'
  },
});

export default DietPlanCard;