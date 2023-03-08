import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet, Touchable, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../helpers/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchPost } from "../stores/actions/actionCreator";

export default function AddCommentScreen({ route, navigation }) {
    const [comment, setComment] = useState();
    const postId = route.params;
    const dispatch = useDispatch();
    const addComment = async () => {
        try {
            const { data: newComment } = await axios({
                method: "POST",
                url: `http://${BASE_URL}:3000/comments`,
                data: {
                    description: comment,
                    PostId: postId,
                    UserId: await AsyncStorage.getItem("userId"),
                },
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                },
            });
            dispatch(fetchPost(postId));
            navigation.navigate("PostDetailScreen");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.exit}>{/* <Image style={styles.icon} source={require("../assets/icons8-close-window-48.png")} /> */}</View>
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
                    <TextInput placeholder="Tweet your reply" placeholderTextColor="#C0C0C0" editable multiline numberOfLines={4} maxLength={40} value={comment} onChangeText={(comment) => setComment(comment)} style={styles.textInput} />
                    <View style={styles.postButtonContainer}>
                        <TouchableOpacity style={styles.postButton} onPress={addComment}>
                            <Text style={styles.textPost}>Reply</Text>
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
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: "cover",
        borderColor: "yellow",
        borderWidth: 1,
    },
    postSection: {
        flex: 4,
        // backgroundColor: "red",
        flexDirection: "row",
        marginTop: 10,
        padding: 15,
    },
    profilePictureContainer: {
        width: "15%",
        alignItems: "center",
        justifyContent: "center",
        height: "15%",
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
