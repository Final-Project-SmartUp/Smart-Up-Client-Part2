import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { TextInput, View, Button, Text, ScrollView, Pressable, Image, SafeAreaView, StyleSheet } from "react-native";
import Loading from "../Components/Loading";
import ProfilePicture from "../Components/ProfilePicture";
import { BASE_URL } from "../helpers/ip";

export default function FoundOpponentScreen({ roomId }) {
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                const { data: room } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/rooms/${roomId}`,
                    headers: {
                        access_token: token,
                    },
                });

                const { data: player1 } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${room.player1}`,
                    headers: {
                        access_token: token,
                    },
                });

                const { data: player2 } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${room.player2}`,
                    headers: {
                        access_token: token,
                    },
                });

                setPlayer1(player1);
                setPlayer2(player2);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.player1Container}>
                <View>
                    <Text style={styles.textPlayer1Name}>{player1?.profileName}</Text>
                    <Text style={styles.textPlayer1Year}> {player1?.mmr} </Text>
                </View>
                <View style={styles.player1Profile}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: player1?.image,
                        }}
                    />
                </View>
            </View>
            <View style={styles.versusContainer}>
                <View style={styles.versus}>
                    <View style={styles.whiteCircle}>
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>VS</Text>
                    </View>
                </View>
            </View>
            <View style={styles.player2Container}>
                <View style={styles.player2Profile}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: player2?.image,
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.textPlayer2Name}>{player2?.profileName}</Text>
                    <Text style={styles.textPlayer2Year}> {player2?.mmr} </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        height: "100%",
    },
    player1Container: {
        backgroundColor: "#D8EBEB",
        height: "45%",
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    player1Profile: {
        width: "25%",
        height: "27%",
        backgroundColor: "#FFE59E",
        borderRadius: 100,
        marginRight: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
    textPlayer1Name: {
        marginRight: 20,
        fontSize: 35,
        fontWeight: "bold",
    },
    textPlayer1Year: {
        marginLeft: 48,
        fontSize: 20,
    },
    versusContainer: {
        backgroundColor: "#F2CAC0",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    versus: {
        width: "20%",
        height: "100%",
        backgroundColor: "#F2CAC0",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    whiteCircle: {
        width: "85%",
        height: "85%",
        backgroundColor: "white",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    player2Container: {
        backgroundColor: "#FFE59E",
        height: "45%",
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    player2Profile: {
        width: "25%",
        height: "27%",
        backgroundColor: "#D8EBEB",
        borderRadius: 100,
        marginLeft: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    textPlayer2Name: {
        marginLeft: 20,
        fontSize: 35,
        fontWeight: "bold",
    },
    textPlayer2Year: {
        marginLeft: 18,
        fontSize: 20,
    },
});
