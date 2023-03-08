import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { primaryColor, tertiartyColor } from "../config/colors";

export default function Categories({ data, index, navigation }) {
    //   console.log(index, "iniii");
    const handleGoToCategoryDetail = (categoryId) => {
        navigation.navigate("CategoryDetail", { categoryId });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handleGoToCategoryDetail(data.id)}>
            <Text style={styles.text}>{data.name}</Text>
            <Image style={styles.image} source={{ uri: data.imageUrl }} />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 30,
        marginTop: 10,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#FEE4BD",
        width: "90%",
        borderRadius: 30,
        flex: 1,
        flexDirection: "row",
    },
    image: {
        marginLeft: 10,
        width: "10%",
        height: "100%",
    },

    text: {
        fontWeight: "bold",
        color: tertiartyColor,
        fontSize: 20,
    },
});
