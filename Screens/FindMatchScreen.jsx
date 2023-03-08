import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import axios from "axios";
import { BASE_URL } from "../helpers/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, updateDoc } from "@firebase/firestore";
import db from "../config/firebaseConnection";

export default function FindMatchScreen({ roomId, navigation }) {
    const handleGoBackToHome = async () => {
        try {
            const { data } = await axios({
                method: "DELETE",
                url: `http://${BASE_URL}:3001/rooms/${roomId}`,
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                },
            });
            const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
            await updateDoc(userRef, {
                isFindMatch: false,
            });
            navigation.navigate("HomePage");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", margin: 0 }}>
            <AnimatedLottieView source={require("../assets/Clock.json")} autoPlay loop={true} resizeMode="cover" style={{ height: 300 }} />
            <Text style={styles.text}>Finding Opponent</Text>
            <TouchableOpacity style={styles.button} onPress={handleGoBackToHome}>
                <Text style={styles.textButton}>CANCEL</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 50,
        fontSize: 35,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    button: {
        marginTop: 100,
        width: "60%",
        height: "10%",
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "#ff787C",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        letterSpacing: 2,
    },
});
