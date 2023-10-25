import React from 'react';
import { Text, View, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton.js'


export const getDimension = () => {
  const { width, height } = Dimensions.get('window');

  return { width, height };
}

const { height, width } = getDimension();

const Onboarding = ({
  title = '',
  Component = null,
  buttonText = 'Continue',
  handleKeyPress = () => {},
  buttonDisabled = false,
  verticalAlignCenter = false,
  isValidating = false,
  isMinimumPaddingTop = false,
}) => {
  return (
    <View
      style={
        isMinimumPaddingTop
          ? StyleSheet.compose(styles.container, styles.minimunPaddingTopOverride)
          : verticalAlignCenter
            ? StyleSheet.compose(styles.container, styles.verticalCenterOverride)
            : styles.container
      }
    >
      <Text style={styles.header}>{title}</Text>
      {Component}
      <KeyboardAvoidingView behavior={'position'} style={styles.buttonWrapper}>
        <PrimaryButton
          buttonDisabled={buttonDisabled}
          isValidating={isValidating}
          buttonText={buttonText}
          handleKeyPress={handleKeyPress}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.25,
    paddingHorizontal: width * 0.1,
    justifyContent: 'flex-start',
  },
  minimunPaddingTopOverride: {
    paddingTop: height * 0.15,
  },
  verticalCenterOverride: {
    paddingTop: 0,
    justifyContent: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    top: height * 0.92,
    left: width * 0.1,
    paddingBottom: 25,
  },
  header: {
    fontSize: 32,
    // fontFamily: 'dmsans-bold',
    marginBottom: 20,
  },
});

export default Onboarding;
