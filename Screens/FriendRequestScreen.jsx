import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import FriendRequest from "../Components/FriendRequest";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendRequest } from "../stores/actions/actionCreator";

const FriendRequestScreen = () => {
    const dispatch = useDispatch()
    const {friendRequest,fetchFriendRequestLoading} = useSelector((state)=>{
        return state.user
    })
    console.log(friendRequest,"ini friend Request")
    const [item, setItem] = useState();
    useEffect(()=>{
        dispatch(fetchFriendRequest())
    },[])
    
    if(fetchFriendRequestLoading){
        return(
            <View>
                <Text>
                    LOADING!!!!!!!
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.textTitle}>Friend Request</Text>
            </View>
            <View style={styles.table}>
                <FlatList data={friendRequest} renderItem={({ item }) => <FriendRequest data={item} />} keyExtractor={(item) => item.id} />
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
