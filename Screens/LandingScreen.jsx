import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import playSound from "../Components/Sound";
import { secondaryColor, tertiartyColor } from "../config/colors";

const LandingPage = ({ navigation }) => {
    return (
        // <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Image source={require("../assets/image.png")} style={styles.image} />
                <Text style={styles.textHeader}>More than just a game</Text>
            </View>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.textButton}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                    navigation.navigate("Login");
                }}
            >
                <Text style={styles.textButton}>SIGN IN</Text>
            </TouchableOpacity>
        </View>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 300,
        marginBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: tertiartyColor,
    },
    textContainer: {
        marginTop: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    textHeader: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 20,
        color: secondaryColor,
        fontWeight: "bold",
        // fontFamily: 'Poppins'
    },
    button1: {
        marginTop: 240,
        width: "90%",
        height: "8%",
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    button2: {
        marginTop: 20,
        width: "90%",
        height: "8%",
        marginBottom: 32,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: tertiartyColor,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default LandingPage;
