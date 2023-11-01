import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
// import VideoCard from "./VideoCard";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const videos = [
  // Video data here
];
//  const [data, setData] = useState([]);

const VideoScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [currentVideo, setCurrentVideo] = React.useState(null);

  const navigateToVideoDetail = (video) => {
    setCurrentVideo(video);
  };

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('access')
    const response = await axios.get(
      "https://gymproject-404a72ac42b8.herokuapp.com/gym/excerise/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }

    );
    console.log(response.data, 'resssssssss')
    return response;
  };
  useEffect(() => {
  const a =  async()=>{
    const data = await fetchData();
    console.log(data.data, 'dataaaaaaaaaaaaaaa2222');
     setData(data?.data)
  }
  a()
}, []);

  return (
    // <View style={{ flex: 1 }}>
    //   {currentVideo ? (
    //     <View style={styles.videoContainer}>
    //       {/* <Video
    //         source={{ uri: currentVideo.videoUrl }}
    //         style={styles.videoPlayer}
    //         controls
    //         paused={false}
    //       /> */}
    //       <TouchableOpacity
    //         style={styles.closeButton}
    //         onPress={() => setCurrentVideo(null)}
    //       >
    //         <Text style={styles.closeButtonText}>Close Video</Text>
    //       </TouchableOpacity>
    //     </View>
    //   ) : (
    //     <FlatList
    //       data={videos}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={({ item }) => (
    //         <VideoCard
    //           video={item}
    //           onPress={() => navigateToVideoDetail(item)}
    //         />
    //       )}
    //     />
    //   )}
    // </View>
<View style={{margin:5}}>
<Text style={{fontSize: 25,marginVertical:20, marginLeft: 10}}>VIDEOS</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      {data && data.length >0 && data.map( (res, ind) => <View key={ind} style={{marginVertical:20}}><VideoCard url={res.videos}/>
      </View>)}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: "white",
  },
});

export default VideoScreen;