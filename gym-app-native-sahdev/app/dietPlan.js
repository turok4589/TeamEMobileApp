import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import DietPlanCard from "../components/DietPlanCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
// import DietPlanCard from "./DietPlanCard";

const dietPlans = [
  {
    id: 5,
    body: "lean",
    morningPlan: "cereals, two boiled eggs",
    morningPlanImage: "photos/2023/10/16/Basic_HTTP_GET.png",
    afternoonPlan: "rice 200gms n 150 grams chicken",
    afternoonPlanImage: "",
    nightPlan: "protien shake",
    nightPlanImage: "",
  },
  {
    id: 6,
    body: "lean",
    morningPlan:
      "2 Scrambled eggs with tomatoes and spinach\r\nGreek yogurt 6 to 8 oz",
    morningPlanImage: "photos/2023/10/16/Breakfast.PNG",
    afternoonPlan:
      "200 grams grilled chicken breast with spices.\r\nSmall cup of cooked quinoa of 50 grams",
    afternoonPlanImage: "photos/2023/10/16/Lunch.PNG",
    nightPlan: "n",
    nightPlanImage: "",
  },
  {
    id: 7,
    body: "lean",
    morningPlan:
      "2 Scrambled eggs with tomatoes and spinach\r\nGreek yogurt 6 to 8 oz",
    morningPlanImage: "photos/2023/10/16/Breakfast.PNG",
    afternoonPlan:
      "200 grams grilled chicken breast with spices.\r\nSmall cup of cooked quinoa of 50 grams",
    afternoonPlanImage: "photos/2023/10/16/Lunch.PNG",
    nightPlan: "n",
    nightPlanImage: "",
  },
];

export const DietPlan = () => {

  const params = useLocalSearchParams();
  const { bmi } = params;
  console.log(bmi, 'bbbbbbbbbbbb')

  const [data, setData] = useState([]);




  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('access')
      console.log(token);
      const response = await axios.get(
        `https://gymproject-404a72ac42b8.herokuapp.com/gym/diet/?body_mass_index=${Math.floor(bmi)}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
  
      );
      console.log(response, 'resssssssss')
      return response;
    } catch (error) {
      console.log(error.message, 'errrrrrrrrrrrrr')
    }

  };
  useEffect(() => {
  const a =  async()=>{
    const data = await fetchData();
    // console.log(data.data, 'dataaaaaaaaaaaaaaa2222');
     setData(data?.data)
  }
  a()
}, []);
  return (
    <ScrollView style={{ marginVertical: 60 }}>
      <Text style={{fontSize: 25,marginVertical:20, marginLeft: 10}}>DIET PLANS</Text>
      {data && data.length > 0 && data.map((plan, index) => (
        <DietPlanCard key={index} plan={plan} />
      ))}
    </ScrollView>
  );
};

export default DietPlan;