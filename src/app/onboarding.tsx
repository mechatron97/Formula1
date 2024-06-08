import { View, StyleSheet, Pressable, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const onboardingSteps = [
    {
        icon: 'racing-helmet',
        title: 'Welcome',
        description: 'Formula 1 for everyone',
    },
    {
        icon: 'speedometer',
        title: 'Ready',
        description: 'Eyes on the track',
    },
    {
        icon: 'flag-checkered',
        title: 'And Race!',
        description: 'Get live updates',
}
];

export default function OnboardingScreen(){

    const [screenIndex, setScreenIndex] = useState(0);

    const data = onboardingSteps[screenIndex];

    const onContinue = () => {
        const isLast = screenIndex === onboardingSteps.length - 1;
        if(isLast){
            registration();
            setScreenIndex(0);
        } else {
            setScreenIndex(screenIndex + 1);
        }
    };

    const onBack = () => {
        const isFirst = screenIndex === 0;
        if(isFirst){
            setScreenIndex(0);
        } else {
            setScreenIndex(screenIndex - 1);
        }
    }

//     const navigation = useNavigation();

    const endOnboarding = () => {
        // navigation.navigate("SignIn");
        router.push("auth/signin");
      };

    const registration = () => {
        // navigation.navigate("SignUp");
        router.push("auth/signup");
    }

    const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
    );

    return(
        <GestureHandlerRootView>
        <GestureDetector gesture={swipes}>
        <View style={styles.page} key={screenIndex}>
        <StatusBar style="auto" />
        <View style={styles.stepIndicatorContainer}>
            {onboardingSteps.map((step, index) => (
                <View 
                key={index}
                style={[styles.stepIndicator, {backgroundColor: index === screenIndex ? 'white' : 'dimgray'}]} 
                />
            ))}
        </View>
        <Animated.Image entering={SlideInRight} source={require('../../assets/onboarding.png')} style={styles.image} />
         <Animated.View entering={FadeIn} exiting={FadeOut}>
         <MaterialCommunityIcons name={data.icon} size={60} color="white" />
         </Animated.View>
         <Animated.Text entering={SlideInRight} exiting={SlideOutLeft} style={styles.title}>{data.title}</Animated.Text>
         <Animated.Text entering={SlideInRight.delay(100)} style={styles.description}>{data.description}</Animated.Text>
             <View style={styles.buttonsRow}>
                <Pressable onPress={endOnboarding}>
                <Text style={styles.buttonText}>Skip</Text>
                </Pressable>
                 <Pressable style={styles.button} onPress={onContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                 </Pressable>
            </View>
        </View>
         </GestureDetector>
         </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({

    page: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#15151d',
        padding: 20
    },
    pageContent: {
        padding: 20,
        flex: 1
    },
    button: {
        backgroundColor: '#ED0500',
        borderRadius: 50,
        alignItems: 'center',
        flex: 1
    },
    buttonsRow: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    buttonText: {
        color: '#FDFDFD',
        fontFamily: 'F1-Regular',
        fontSize: 16,
        padding: 15,
        paddingHorizontal: 25
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 16 / 9,
        alignSelf: 'center',
        margin: 20,
        marginTop: 150,
    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: "bold",
        letterSpacing: 1.3,
        fontFamily: 'F1-Regular',
    },
    description: {
        color: 'gray',
        fontSize: 20,
        fontFamily: 'F1-Regular',
        lineHeight: 28,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingHorizontal: 20,
        margin: 'auto'
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: 5,
    },
    stepIndicator: { 
        flex: 1,
        height: 5, 
        backgroundColor: '#3B71F3',
        borderRadius: 10
    }

})