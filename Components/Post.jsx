import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { BASE_URL } from "../helpers/ip";
import axios from "axios";
import Loading from "./Loading";

export default function Post({ data, navigation }) {
    const [user, setUser] = useState();
    const [loadingFetchUser, setLoadingFetchUser] = useState(true);

    const handleDetailPost = () => {
        navigation.navigate("PostDetailScreen", data.id);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data: userData } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${data.UserId}`,
                    headers: {
                        access_token: await AsyncStorage.getItem("access_token"),
                    },
                });
                setUser(userData);
                setLoadingFetchUser(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    if (loadingFetchUser) {
        return <Loading />;
    }

    return (
        <View style={{ gap: 2 }}>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: user.image,
                        }}
                    />
                </View>
                <Text style={styles.textProfileName}>{user.profileName}</Text>
            </View>
            <View style={styles.postContainer}>
                <Text style={styles.textPost}>{data.description}</Text>
            </View>
            <TouchableOpacity style={styles.replyIconContainer} onPress={() => handleDetailPost(data.id)}>
                <View style={styles.replyIcon}>
                    <Image style={styles.icon} source={require("../assets/icons8-response-80.png")} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textButton: {
        color: "white",
    },
    textProfileName: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 18,
    },
    postContainer: {
        height: "auto",
        borderBottomWidth: 1,
        paddingLeft: 5,
        padding: 2,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        paddingBottom: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        // backgroundColor:'red',
    },
    profileContainer: {
        width: "7%",
        height: "110%",
        backgroundColor: "black",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    textPost: {
        marginBottom: 10,
        marginTop: 10,
    },
    replyIconContainer: {
        height: 50,
        justifyContent: "center",
        marginBottom: 5,
    },
    replyIcon: {
        width: "10%",
        height: "70%",
    },
    icon: {
        width: "100%",
        height: "100%",
    },
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
});
