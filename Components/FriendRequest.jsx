import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function FriendRequest({ data }) {
    return (
        <View style={styles.tableRow}>
            <View style={styles.friendInfo}>
                <Image
                    style={styles.profilePicture}
                    source={{
                        uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                />
                <Text>{data.title}</Text>
            </View>
            <View style={styles.action}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                    <Text style={styles.actionText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tableRow: {
        marginBottom: 10,
        width: "90%",
        height: 80,
        justifyContent: "space-between",
        alignSelf: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: "#ffe4c4",
        borderWidth: 3,
        borderStyle: "solid",
    },

    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    action: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },

    friendInfo: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },

    button: {
        backgroundColor: "red",
        borderRadius: 5,
        padding: 8,
    },

    actionText: {
        fontSize: 12,
        color: "white",
    },

    acceptButton: {
        backgroundColor: "blue",
    },

    cancelButton: {
        backgroundColor: "red",
    },
});
