import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet, Touchable, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../helpers/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../stores/actions/actionCreator";

export default function AddPost({ route, navigation }) {
    const categoryId = route.params;
    const [post, setPost] = useState("");
    const dispatch = useDispatch();

    //! Add Post
    const addPosting = async () => {
        try {
            const { data } = await axios({
                method: "POST",
                url: `http://${BASE_URL}:3000/posts`,
                data: {
                    title: post,
                    description: post,
                    userId: await AsyncStorage.getItem("userId"),
                    categoryId: categoryId,
                },
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                },
            });
            dispatch(fetchPosts(categoryId));
            navigation.navigate("CategoryDetail", { categoryId });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={styles.postSection}>
                <View style={styles.profilePictureContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                        }}
                    />
                </View>
                <View style={styles.inputTextContainer}>
                    <TextInput placeholder="What's happening?" placeholderTextColor="#C0C0C0" editable multiline numberOfLines={4} maxLength={40} value={post} onChangeText={(post) => setPost(post)} style={styles.textInput} />
                    <View style={styles.postButtonContainer}>
                        <TouchableOpacity style={styles.postButton} onPress={addPosting}>
                            <Text style={styles.textPost}>POST</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FF",
        flexDirection: "column",
        alignItems: "center",
    },
    exit: {
        marginLeft: 5,
        width: "20%",
        height: "5%",
        // backgroundColor:'red'
    },
    icon: {
        width: "45%",
        height: "65%",
    },
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
    postSection: {
        flex: 4,
        // backgroundColor: "red",
        flexDirection: "row",
        marginTop: 10,
        padding: 15,
    },
    profilePictureContainer: {
        width: "13%",
        backgroundColor: "#FEE4BD",
        alignItems: "center",
        justifyContent: "center",
        height: "6%",
        borderRadius: 100,
        marginTop: 13,
        marginLeft: 10,
    },
    inputTextContainer: {
        // backgroundColor:'grey',
        marginLeft: 10,
        width: "75%",
        height: "30%",
    },
    textInput: {
        width: "100%",
    },
    postButtonContainer: {
        top: 30,
        alignItems: "flex-end",
        // backgroundColor:'yellow'
    },
    postButton: {
        backgroundColor: "#A8D978",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        height: "40%",
        borderRadius: 20,
    },
    textPost: {
        fontWeight: "bold",
        color: "white",
    },
});
