import { StyleSheet, Text, View, Image } from "react-native";
import { primaryColor, tertiartyColor } from "../config/colors";

export default function LeaderboardComponent({ data, index }) {
    //   console.log(index, "iniii");
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
        // backgroundColor: "white",
        // borderRadius:30,
        padding: 20,
        // marginVertical: ,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
    },
    profileContainer: {
        // backgroundColor: "yellow",
        width: "10%",
        height: "185%",
        borderRadius: 100,
        // justifyContent:'center',
        alignItems: "center",
    },
    nameContainer: {
        marginLeft: 40,
    },
    rrmContainer: {
        backgroundColor: primaryColor,
        paddingVertical: 5,
        width: "15%",
        height: "100%",
        borderRadius: 15,
        marginLeft: 60,
    },
    fontMmr: {
        textAlign: "center",
        color: tertiartyColor,
        fontWeight: "bold",
    },
    text: {
        fontWeight: "bold",
    },
    //   imageReply: {
    //     width: "10%",
    //     height: "10%",
    //     borderRadius: 100,
    // },
});
