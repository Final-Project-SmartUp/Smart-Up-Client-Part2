import { doc, onSnapshot, query, collection } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View, Image, Button, Pressable, FlatList, TouchableOpacity } from "react-native";
import LeaderboardComponent from "../Components/LeaderBoard";
import db from "../config/firebaseConnection";
import { BASE_URL } from "../helpers/ip";
import axios from "axios";
import Loading from "../Components/Loading";
import { primaryColor, secondaryColor, tertiartyColor } from "../config/colors";

export default function Leaderboard() {
    const [listofPlayer, setListofPlayer] = useState();

    useEffect(() => {
        (async () => {
            try {
                const q = query(collection(db, "users"));
                const unsubscribe = onSnapshot(q, async (doc) => {
                    const { data: leaderboard } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3001/users/leaderboard`,
                    });
                    setListofPlayer(leaderboard);
                });
                return () => unsubscribe();
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const DATA = [
        {
            id: "1",
            title: "First Item",
            rrm: 300,
        },
        {
            id: "2",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "3",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "4",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "5",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "6",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "7",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "8",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "9",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "10",
            title: "Third Item",
            rrm: 300,
        },
    ];
    const Item = ({ profileName }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{profileName}</Text>
        </View>
    );

    if (listofPlayer === undefined) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollView}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>This Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>This Month</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topThreeContainer}>
                    <View style={styles.name}>
                        <View style={styles.second}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: listofPlayer[1]?.image,
                                }}
                            />
                        </View>
                        <Text style={styles.nameProfile}>{listofPlayer[1]?.profileName}</Text>
                        <View style={styles.mmrContainer}>
                            <Text style={styles.fontMmr}>{listofPlayer[1]?.mmr}</Text>
                        </View>
                    </View>
                    <View style={styles.name}>
                        <View style={styles.first}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: listofPlayer[0]?.image,
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.nameProfile}>{listofPlayer[0]?.profileName}</Text>
                        </View>
                        <View style={styles.mmrContainer}>
                            <Text style={styles.fontMmr}>{listofPlayer[0]?.mmr}</Text>
                        </View>
                    </View>
                    <View style={styles.name}>
                        <View style={styles.second}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: listofPlayer[2]?.image,
                                }}
                            />
                        </View>
                        <Text style={styles.nameProfile}> {listofPlayer[2]?.profileName}</Text>
                        <View style={styles.mmrContainer}>
                            <Text style={styles.fontMmr}>{listofPlayer[2]?.mmr}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flatListContainer}>
                    <FlatList data={listofPlayer} renderItem={({ item }) => <LeaderboardComponent data={item} />} keyExtractor={(item) => item.id} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: secondaryColor,
    },
    header: {
        height: "2%",
    },
    scrollView: {
        // backgroundColor: "pink",
        height: "100%",
    },
    text: {
        fontSize: 42,
    },
    buttonContainer: {
        // flex:1,
        width: "100%",
        height: "10%",
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "space-evenly",
    },
    button: {
        backgroundColor: tertiartyColor,
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
        borderRadius: 20,
    },
    textButton: {
        fontWeight: "bold",
        color: "white",
    },
    topThreeContainer: {
        width: "100%",
        height: "20%",
        // backgroundColor: "black",
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        justifyContent: "space-evenly",
    },
    image: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
    },
    name: {
        // backgroundColor: "red",
        width: "26%",
        height: "100%",
        // justifyContent:'center',
        alignItems: "center",
    },
    first: {
        backgroundColor: primaryColor,
        height: "43%",
        width: "65%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    second: {
        backgroundColor: primaryColor,
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        height: "43%",
        width: "65%",
        borderRadius: 100,
    },
    nameProfile: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "bold",
    },
    mmrContainer: {
        backgroundColor: primaryColor,
        width: "60%",
        height: "13%",
        marginTop: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    flatListContainer: {
        height: "70%",
        borderTopWidth: 1,
        borderTopColor: "grey",
        //  backgroundColor:'yellow'
    },
    mmr: {
        width: "20%",
        height: "20%",
        // backgroundColor:'green'
    },
    fontMmr: {
        color: tertiartyColor,
        fontWeight: "bold",
    },
});
