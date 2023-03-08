import { StyleSheet, Text, View, Image } from "react-native";
import { primaryColor } from "../config/colors";

export default function FriendList({ data, index }) {
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Text style={styles.text}>{data.profileName}</Text>
            </View>
            <View style={styles.rrmContainer}>
                <Text style={styles.fontMmr}>{data.mmr}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#9FADAD",
    },

    nameContainer: {
        marginLeft: 40,
    },
    rrmContainer: {
        backgroundColor: "white",
        width: "11%",
        height: "105%",
        borderRadius: 100,
        marginLeft: 60,
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
