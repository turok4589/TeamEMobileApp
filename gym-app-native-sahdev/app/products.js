import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const productData = [
  {
    "id": 15,
    "name": "Essentia Water",
    "image": "https://target.scene7.com/is/image/Target/GUEST_7b48c180-c44d-4ad0-94b7-7238df157e9c?wid=1200&hei=1200&qlt=80&fmt=webp",
    "price": 3,
    "headline": "Higher Ionized Alkaline Water",
  },
  {
    "id": 4,
    "name": "MuscleSport Protein Powder",
    "image": "https://shop.bodybuilding.com/cdn/shop/products/MT1130272_MT_Nitrotech_CC_4lb_grey_900x.jpg?v=1650442275",
    "price": 75,
    "headline": "Muscle Building",
  },
  {
    "id": 9,
    "name": "GHOST Legend V2 Pre-Workout Energy Powder",
    "image": "https://m.media-amazon.com/images/I/71fF1AWn9ML.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    "price": 40,
    "headline": "Energy",
  },
  // Add more product data here
];

const ProductCard = ({ product, selectedProducts, setSelectedProducts }) => {

  const handleBuyPress = async() => {
    // Add your buy logic here
//  setSelectedProducts([...selectedProducts, product])
try {
const token = await AsyncStorage.getItem('access')

  await axios.post('https://gymproject-404a72ac42b8.herokuapp.com/ecomerce/order/', {
  product: product.id,
  delivery_address: "abc",
  delivery_address_pincode: 474012
}, {
  headers: {
    Authorization:
      `Bearer ${token}`,
  },
})
 console.log(selectedProducts)
    alert(`${product.name} added to your cart`);
} catch (error) {
  console.log(error)
}


  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productHeadline}>{product.headline}</Text>
      <TouchableOpacity onPress={handleBuyPress} style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
const [selectedProducts, setSelectedProducts] = useState([]);
const [data, setData] = useState([]);

useEffect(()=>{
  const a = async()=>{
    const token = await AsyncStorage.getItem('access')

const response = await axios.get('https://gymproject-404a72ac42b8.herokuapp.com/ecomerce/product/', {
headers: {
  Authorization:
    `Bearer ${token}`,
},
})
setData(response.data);
}
a()
},[])

  return (
    <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
      <TouchableOpacity onPress={()=>router.push({
        pathname: "/cart", params: { data: selectedProducts }
      })}  style={{...styles.buyButton, backgroundColor:'grey', margin:10, width:100, alignSelf:'flex-end'}}>
        <Text style={{...styles.buyButtonText, color:'white'}}>Go to your cart</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    alignItems:'center'
  },
  productImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
  },
  productHeadline: {
    fontSize: 14,
    marginTop: 5,
  },
  buyButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width:'100%'
  },
  buyButtonText: {
    // color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
