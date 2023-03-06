import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet } from "react-native";
import React from "react";

export default function AddPost() {
    const [post, setPost] = React.useState("");
    return (
        <View style={styles.container}>
            <View style={styles.exit}>
                <Image style={styles.icon} source={require("../assets/icons8-close-window-48.png")} />
            </View>
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
                        <View style={styles.postButton}>
                            <Text style={styles.textPost}>POST</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "#F6F8FF",
    },
    exit: {
        marginTop: 60,
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
        height: "100%",
        marginTop: 10,
        padding: 15,
        marginLeft: 40,
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
        // backgroundColor:'yellow',
        marginBottom: 80,
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
