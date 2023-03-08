import { TextInput, View, Button, Text, ScrollView, Pressable, Image } from "react-native";
import { StyleSheet } from "react-native";
import ProfilePicture from "../Components/ProfilePicture";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../helpers/ip";
import Loading from "../Components/Loading";
import { doc, updateDoc } from "@firebase/firestore";
import db from "../config/firebaseConnection";
import { useFocusEffect } from "@react-navigation/core";

export default function ResultScreen({ route, navigation }) {
    const roomId = route.params;
    const [room, setRoom] = useState({});
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [loading, setLoading] = useState(true);
    const [player1ID, setPlayer1ID] = useState();
    const [player2ID, setPlayer2ID] = useState();
    const [mmrPlayer1, setMmrPlayer1] = useState();
    const [mmrPlayer2, setMmrPlayer2] = useState();

    const handleBackToHome = async () => {
        try {
            navigation.navigate("Home");
        } catch (err) {
            console.log(err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const { data: roomData } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3001/rooms/${roomId}`,
                        headers: {
                            access_token: await AsyncStorage.getItem("access_token"),
                        },
                    });
                    console.log(roomData, "ini room data");

                    const { data: player1 } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3001/users/${roomData.player1}`,
                        headers: {
                            access_token: await AsyncStorage.getItem("access_token"),
                        },
                    });

                    const { data: player2 } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3001/users/${roomData.player2}`,
                        headers: {
                            access_token: await AsyncStorage.getItem("access_token"),
                        },
                    });

                    if (roomData.player1 === (await AsyncStorage.getItem("userId"))) {
                        setPlayer1ID(await AsyncStorage.getItem("userId"));
                    }

                    if (roomData.player2 === (await AsyncStorage.getItem("userId"))) {
                        setPlayer2ID(await AsyncStorage.getItem("userId"));
                    }

                    setRoom(roomData);

                    const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
                    await updateDoc(userRef, {
                        isFindMatch: false,
                    });

                    const roomRef = doc(db, "rooms", roomData.id);
                    await updateDoc(roomRef, {
                        isEnded: true,
                    });

                    if (roomData.scorePlayer1 > roomData.scorePlayer2) {
                        const userRef1 = doc(db, "users", roomData.player1);
                        const userRef2 = doc(db, "users", roomData.player2);
                        await updateDoc(userRef1, {
                            mmr: player1.mmr + 12.5,
                        });
                        await updateDoc(userRef2, {
                            mmr: player2.mmr - 12.5,
                        });
                    } else if (roomData.scorePlayer2 > roomData.scorePlayer1) {
                        const userRef1 = doc(db, "users", roomData.player1);
                        const userRef2 = doc(db, "users", roomData.player2);
                        await updateDoc(userRef2, {
                            mmr: player2.mmr + 12.5,
                        });
                        await updateDoc(userRef1, {
                            mmr: player1.mmr - 12.5,
                        });
                    }

                    setPlayer1(player1.profileName);
                    setPlayer2(player2.profileName);
                    setMmrPlayer1(player1.mmr);
                    setMmrPlayer2(player2.mmr);
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                }
            })();
        }, [])
    );

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data: roomData } = await axios({
    //                 method: "GET",
    //                 url: `http://${BASE_URL}:3001/rooms/${roomId}`,
    //                 headers: {
    //                     access_token: await AsyncStorage.getItem("access_token"),
    //                 },
    //             });
    //             console.log(roomData, "ini room data");

    //             const { data: player1 } = await axios({
    //                 method: "GET",
    //                 url: `http://${BASE_URL}:3001/users/${roomData.player1}`,
    //                 headers: {
    //                     access_token: await AsyncStorage.getItem("access_token"),
    //                 },
    //             });

    //             const { data: player2 } = await axios({
    //                 method: "GET",
    //                 url: `http://${BASE_URL}:3001/users/${roomData.player2}`,
    //                 headers: {
    //                     access_token: await AsyncStorage.getItem("access_token"),
    //                 },
    //             });

    //             if (roomData.player1 === (await AsyncStorage.getItem("userId"))) {
    //                 setPlayer1ID(await AsyncStorage.getItem("userId"));
    //             }

    //             if (roomData.player2 === (await AsyncStorage.getItem("userId"))) {
    //                 setPlayer2ID(await AsyncStorage.getItem("userId"));
    //             }

    //             setRoom(roomData);

    //             const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
    //             await updateDoc(userRef, {
    //                 isFindMatch: false,
    //             });

    //             const roomRef = doc(db, "rooms", roomData.id);
    //             await updateDoc(roomRef, {
    //                 isEnded: true,
    //             });

    //             if (room.scorePlayer1 > room.scorePlayer2) {
    //                 const userRef1 = doc(db, "users", roomData.player1);
    //                 const userRef2 = doc(db, "users", roomData.player2);
    //                 await updateDoc(userRef1, {
    //                     mmr: player1.mmr + 25,
    //                 });
    //                 await updateDoc(userRef2, {
    //                     mmr: player2.mmr - 25,
    //                 });
    //             } else if (room.scorePlayer2 > room.scorePlayer1) {
    //                 const userRef1 = doc(db, "users", roomData.player1);
    //                 const userRef2 = doc(db, "users", roomData.player2);
    //                 await updateDoc(userRef2, {
    //                     mmr: player2.mmr + 25,
    //                 });
    //                 await updateDoc(userRef1, {
    //                     mmr: player1.mmr - 25,
    //                 });
    //             }

    //             setPlayer1(player1.profileName);
    //             setPlayer2(player2.profileName);
    //             setLoading(false);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     })();
    // }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{player1ID === room.player1 && room.scorePlayer1 > room.scorePlayer2 ? "YOU WIN" : player2ID === room.player2 && room.scorePlayer2 > room.scorePlayer1 ? "YOU WIN" : "YOU LOSE"}</Text>
                </View>
                <View style={styles.playersContainer}>
                    <View style={styles.profileContainer}>
                        <ProfilePicture />
                        <Text style={styles.textPlayer}>{player1}</Text>

                        <View style={styles.mmrContainer}>
                            <Text style={styles.mmrFont}>{mmrPlayer1}</Text>
                        </View>
                    </View>
                    <View style={styles.profileContainer}>
                        <ProfilePicture />
                        <Text style={styles.textPlayer}>{player2}</Text>

                        <View style={styles.mmrContainer}>
                            <Text style={styles.mmrFont}>{mmrPlayer2}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.textTotalScore}>
                    <Text>Score</Text>

                    <Text>Score</Text>
                </View>
                <View style={styles.totalScoreContainer}>
                    <View style={styles.boxesContainer}>
                        <View style={styles.boxScore}>
                            <Text style={styles.textScore}>{room.scorePlayer1}</Text>
                        </View>
                    </View>
                    <View style={styles.boxesContainer}>
                        <View>
                            <Text style={styles.textScore}>VS</Text>
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
                    <Pressable style={styles.backButton} onPress={() => handleBackToHome()}>
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
    profileContainer: {
        width: "50%",
        alignItems: "center",
        // backgroundColor: "red",
    },
    profileName: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-around",
        height: "6%",
        alignItems: "center",
    },
    mmrContainer: {
        width: "30%",
        height: "20%",
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    mmrFont: {
        color: "white",
        fontWeight: "bold",
    },
    textPlayer: {
        fontSize: 23,
        fontWeight: "bold",
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
