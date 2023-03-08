import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import FriendRequest from "../Components/FriendRequest";

const FriendRequestScreen = () => {
    const [item, setItem] = useState();

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
        {
            id: "11",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "12",
            title: "Third Item",
            rrm: 300,
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.textTitle}>Friend Request</Text>
            </View>
            <View style={styles.table}>
                <FlatList data={DATA} renderItem={({ item }) => <FriendRequest data={item} />} keyExtractor={(item) => item.id} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 0.15,
        justifyContent: "center",
        paddingLeft: 20,
    },
    textTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
    },
    table: {
        flex: 1,
    },
});

export default FriendRequestScreen;
