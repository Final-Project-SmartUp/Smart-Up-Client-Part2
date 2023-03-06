import { TextInput, View, Button, Text, ScrollView, Pressable, Image } from "react-native";
import { StyleSheet } from "react-native";
import ProfilePicture from "../Components/ProfilePicture";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ResultScreen({ route }) {
    const roomId = route.params;
    const [room, setRoom] = useState({});
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const BASE_URL = `192.168.9.117`;

    console.log(roomId, "<<", room, "ini penting");
    useEffect(() => {
        (async () => {
            try {
                const { data: roomData } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/rooms/${roomId}`,
                });

                const { data: player1 } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${room.player1}`,
                });

                const { data: player2 } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${room.player2}`,
                });

                setRoom(roomData);
                setPlayer1(player1.profileName);
                setPlayer2(player2.profileName);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>YOU WIN</Text>
                </View>
                <View style={styles.playersContainer}>
                    <ProfilePicture />
                    <ProfilePicture />
                </View>
                <View style={styles.profileName}>
                    <Text style={styles.textPlayer1}>{player1}</Text>
                    <Text style={styles.textPlayer2}>{player2}</Text>
                </View>
                <View style={styles.textTotalScore}>
                    <Text style={{ marginLeft: 9 }}>Score</Text>
                    <Text>Total Score</Text>
                    <Text style={{ marginRight: 8 }}>Score</Text>
                </View>
                <View style={styles.totalScoreContainer}>
                    <View style={styles.boxesContainer}>
                        <View style={styles.boxScore}>
                            <Text style={styles.textScore}>{room.scorePlayer1}</Text>
                        </View>
                    </View>
                    <View style={styles.boxesContainer}>
                        <View style={styles.boxScore}>
                            <Text style={styles.textScore}>{room.scorePlayer1 + room.scorePlayer2}</Text>
                        </View>
                    </View>
                    <View style={styles.boxesContainer}>
                        <View style={styles.boxScore}>
                            <Text style={styles.textScore}>{room.scorePlayer2}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.options}>
                    <Pressable style={styles.rematchButton}>
                        <Text style={styles.textOptions}>REMATCH</Text>
                    </Pressable>
                    <Pressable style={styles.playAnotherButton}>
                        <Text style={styles.textOptions}>PLAY ANOTHER</Text>
                    </Pressable>
                    <Pressable style={styles.backButton}>
                        <Text style={styles.textOptions}>BACK</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    result: {
        alignItems: "center",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    resultText: {
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: 10,
    },
    playersContainer: {
        height: "13%",
        alignItems: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    profileName: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-around",
        height: "6%",
        alignItems: "center",
    },
    textPlayer1: {
        fontSize: 23,
        fontWeight: "bold",
        marginLeft: 30,
    },
    textPlayer2: {
        fontSize: 23,
        fontWeight: "bold",
        marginRight: 27,
    },
    textTotalScore: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: 60,
        paddingRight: 60,
        marginTop: 50,
    },
    boxesContainer: {
        backgroundColor: "#D8EBEB",
        width: "27%",
        height: "90%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    totalScoreContainer: {
        height: "10%",
        marginBottom: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingRight: 58,
        paddingLeft: 60,
    },
    boxScore: {
        backgroundColor: "white",
        width: "80%",
        height: "80%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textScore: {
        fontSize: 35,
        color: "#A8D978",
    },
    options: {
        alignItems: "center",
    },
    rematchButton: {
        backgroundColor: "#EABEB3",
        width: "70%",
        height: "15%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    playAnotherButton: {
        backgroundColor: "#D8EBEB",
        width: "70%",
        height: "15%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    backButton: {
        backgroundColor: "#A8D978",
        width: "70%",
        height: "15%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    textOptions: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
