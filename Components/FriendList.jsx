import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { primaryColor } from "../config/colors";

export default function FriendList({ data, index }) {
    console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Image
                    style={styles.profilePicture}
                    source={{
                        uri: data.image,
                    }}
                />
                <Text style={styles.text}>{data.name}</Text>
            </View>
            <TouchableOpacity style={styles.rrmContainer}>
                <Image style={styles.chatIcon} source={require("../assets/icons8-chat-message-50.png")} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#9FADAD",
    },
    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: "cover",
    },

    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    rrmContainer: {
        width: "11%",
        height: "105%",
        borderRadius: 100,
    },

    chatIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    fontMmr: {
        textAlign: "center",
        color: "#87ae73",
        fontWeight: "bold",
    },
    text: {
        fontWeight: "bold",
    },
});
