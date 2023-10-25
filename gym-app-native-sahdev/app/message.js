import React from "react";
import { useEffect, useState } from "react";
import{ View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions, Bubble, Composer, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { Icon } from "react-native-elements";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load initial chat history or any other setup here
  }, []);

  const handleSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    // You can also send the message to your server here
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          marginLeft: 20,
          marginRight: 10,
          borderWidth: 1.5,
          borderTopWidth: 1.5,
          borderColor: 'gray',
          borderTopColor: 'gray',
          borderRadius: 25,
          position: 'absolute',
          bottom:10
        }}
      />
    );
  };


  const renderComposer = (props) => (
    <Composer {...props} textInputStyle={styles.textInputStyle} />
  );

  const renderBubble = (props) => {
    const { currentMessage } = props;
    let extraWidth = 0;
    if (currentMessage.text?.length < 24) {
      extraWidth = 50;
    }
    return (
      <Bubble
        {...props}
        textStyle={{
                right: {
                  // fontFamily: EFonts.DMSANS_REGULAR,
                  lineHeight: 23,
                  fontSize: 15,
                },
                left: {
                  // fontFamily: EFonts.DMSANS_REGULAR,
                  lineHeight: 23,
                  fontSize: 15,
                },
              }
        }
        wrapperStyle={ {
                right: {
                  marginRight: 5,
                  padding: 5,
                  backgroundColor: '#8e35ab',
                  borderRadius: 25,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 0,
                  paddingRight: 5 + extraWidth,
                },
                left: {
                  marginLeft: 5,
                  padding: 5,
                  borderRadius: 20,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 0,
                  paddingRight: 5 + extraWidth,
                  // backgroundColor: 'lightgrey',

                },
              }
        }
        bottomContainerStyle={
          currentMessage.text?.length < 24
              ? {
                  right: {
                    position: 'absolute',
                    width: 70,
                    bottom: -4,
                    right: -50,
                  },
                }
              : {}
        }
      />
    );
  };

  const renderSend = (sendProps) => {
    const { text, messageIdGenerator, user, onSend } = sendProps;

    return (
      <TouchableOpacity
        style={{  justifyContent: 'center' }}
        onPress={() => {
          if (text && onSend) {
            onSend({ text: text.trim(), user: user, _id: 0 }, true);
          }
        }}
      >
        <Icon
          name="ios-send-outline"
          reverse
          size={15}
          type="ionicon"
        />
      </TouchableOpacity>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleSend(newMessages)}
      renderInputToolbar={renderInputToolbar}
      user={{ _id: 0 }}
      alwaysShowSend
      infiniteScroll
      renderComposer={renderComposer}
      renderBubble={renderBubble}
      renderAvatar={null}
      renderSend={renderSend}
      messagesContainerStyle={styles.messagesContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainerStyle: {
    height: '99%',
    top: -60,
    paddingTop: 28,
    backgroundColor:'white'
  },
  textInputStyle: {
    color: '#222B45',
    // fontFamily: EFonts.DMSANS_REGULAR,
    lineHeight: 20.5,
  },

})
export default ChatScreen;