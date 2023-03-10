import { StyleSheet, View, Text, Image } from "react-native";

export default function ProfilePicture({ image }) {
    return (
        <View
            style={{
                width: 80,
                height: 80,
                backgroundColor: "white",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 3,
            }}
        >
            <Image
                style={styles.image}
                source={{
                    uri: image,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
});
