import { StyleSheet, View, Text, Image } from "react-native";
import { primaryColor } from "../config/colors";

export default function PostDetailReply({ data }) {
    return (
        <View style={styles.container}>
            <View style={styles.profileImageReplyContainer}>
                <Image
                    style={styles.imageReply}
                    source={{
                        uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                />
            </View>
            <View style={styles.replyContainer}>
                <Text style={styles.textProfileNameReply}>{data.profileName}</Text>
                <View style={styles.boxComment}>
                    <View style={styles.commentContainer}>
                        <Text style={styles.reply}>{data.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        borderBottomWidth: 1,
        flex: 1,
    },
    profileImageReplyContainer: {
        width: "8%",
        height: "63%",
        backgroundColor: primaryColor,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    imageReply: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
    },
    textProfileNameReply: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 13,
    },
    replyContainer: {
        justifyContent: "flex-start",
    },
    boxComment: {
        width: "auto",
        height: "auto",
        marginTop: 3,
    },
    commentContainer: {
        backgroundColor: "#ebe9e6",
        marginLeft: 10,
        borderRadius: 15,
        padding: 3,
        width: "auto",
        paddingRight: 3,
    },
    reply: {
        fontSize: 12,
    },
});
