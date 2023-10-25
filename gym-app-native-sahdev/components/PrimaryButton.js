import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';


const PrimaryButton = ({
  buttonDisabled = false,
  isValidating = false,
  buttonText = 'Continue',
  handleKeyPress = () => {},
}) => {
  return (
    <TouchableOpacity
      disabled={buttonDisabled}
      style={
        !buttonDisabled
          ? styles.button
          : StyleSheet.compose(styles.button, styles.buttonDisabledOverride)
      }
      onPress={handleKeyPress}
    >
      {isValidating ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={styles.buttonText}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    // width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 24,
  },
  buttonDisabledOverride: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    // fontFamily: 'dmsans-bold',
  },
});
export default PrimaryButton;
