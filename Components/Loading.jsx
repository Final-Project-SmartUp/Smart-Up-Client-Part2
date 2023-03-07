import { Image, StyleSheet, View } from "react-native";

export default function Loading() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/loading-bar-932_512.gif")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "70%",
        height: "30%",
    },
});
