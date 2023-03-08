import React from "react";
import { View, Text } from "react-native";
import AnimatedLottieView from "lottie-react-native";

export default function Loading() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 0 }}>
            <AnimatedLottieView source={require("../assets/loading.json")} autoPlay loop={true} resizeMode="cover" style={{ height: 300 }} />
        </View>
    );
}
