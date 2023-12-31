import * as React from "react";
import { View, StyleSheet, Button, ScrollView, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function VideoCard({url, images={}}) {
  console.log(url, 'urllllllllllllllllll')
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url
          // "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {console.log(images)}
      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{alignSelf: 'center'}}>
        <Image source={{uri: images.images}} style={{width:100, height: 100, margin: 10}} width={100} height={100}/>
        <Image source={{uri: images.images1}} width={100} height={100}style={{width:100, height: 100, margin: 10}}/>
        <Image source={{uri: images.images2}} width={100} height={100}style={{width:100, height: 100, margin: 10}}/>
        <Image source={{uri: images.images3}} width={100} height={100}style={{width:100, height: 100, margin: 10}}/>
        <Image source={{uri: images.images4}} width={100} height={100}style={{width:100, height: 100, margin: 10}}/>

      </ScrollView>
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});