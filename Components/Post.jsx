import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { BASE_URL } from "../helpers/ip";
import axios from "axios";

export default function Post({ post, navigation }) {
    console.log(post, "ini post");
    const [user, setUser] = useState();
    const [loadingFetchUser, setLoadingFetchUser] = useState(true);

    const handleDetailPost = () => {
        navigation.navigate("PostDetailScreen", post.id);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data: userData } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${post.UserId}`,
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
        return <Text>Masih loading fetch user....</Text>;
    }

    return (
        <>
            <View style={styles.postContainer}>
                <View style={styles.profileContainer}>
                    {/* <Image
            style={styles.image}
            source={{
              uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
            }}
          /> */}
                </View>
                <Text style={styles.textProfileName}>{user.profileName}</Text>
            </View>
            <View style={styles.postContainer}>
                <Text style={styles.textPost}>{post.description}</Text>
            </View>
            <View style={styles.replyIconContainer}>
                <TouchableOpacity style={styles.replyIcon} onPress={() => handleDetailPost(post.id)}>
                    <Image style={styles.icon} source={require("../assets/icons8-response-80.png")} />
                </TouchableOpacity>
            </View>
        </>
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
        backgroundColor: "red",
        marginTop: 30,
    },
    postContainer: {
        height: "15%",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        alignItems: "center",
        borderBottomWidth: 1,
    },
    profileContainer: {
        width: "13%",
        height: "120%",
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
