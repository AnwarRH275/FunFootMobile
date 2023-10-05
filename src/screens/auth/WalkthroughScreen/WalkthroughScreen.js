import React from "react";
import { View, Image, Text, useColorScheme } from "react-native";
import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import dynamicStyles from "./styles";


const WalkthroughScreen = (props) => {
  const appConfig = props.appConfig;
  const appStyles = props.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  // const setShowRealApp = props.setShowRealApp;


  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    }
  );

  const _renderItem = ({ item, dimensions }) => (
    <View style={[styles.container, dimensions]}>
      <Image
        style={styles.image}
        source={item.image}
        size={100}
        color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  const _onDone = () => {
    props.setShowRealApp(false);
  };

  const _onSkip = () => {
    // Handle the skip event here
    console.log("skipping")
    props.setShowRealApp(false);
  };
  
  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      //Handler for the done On last slide
      onDone={_onDone}
      onSkip={_onSkip}
      showSkipButton={true}
      showDoneButton={true}
      showNextButton={true}
    />
  );
};

WalkthroughScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default WalkthroughScreen;
