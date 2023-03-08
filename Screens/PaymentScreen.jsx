import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import { BASE_URL } from "../helpers/ip";
import { fetchUser } from "../stores/actions/actionCreator";

export default function Payment({ navigation }) {
    const [loadingPayment, setLoadingPayment] = useState(false);

    const dispatch = useDispatch();

    const handlePayment = async (value) => {
        const userToken = await AsyncStorage.getItem("access_token");
        try {
            setLoadingPayment(true);
            const { data } = await axios({
                method: "post",
                url: `http://${BASE_URL}:3001/users/checkoutGem`,
                headers: {
                    access_token: userToken,
                },
                data: {
                    totalGem: +value,
                },
            });
            setLoadingPayment(false);
            await dispatch(fetchUser());
            navigation.navigate("HandlePayment", data.redirect_url);
        } catch (err) {
            console.log(err);
        }
    };

    if (loadingPayment) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.fontHeader}>PAY TO WIN</Text>
            </View>
            <View style={styles.options}>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../assets/gems.png")} />
                    </View>
                    <Text style={styles.gems}>3 Gems</Text>
                    <TouchableOpacity style={styles.amountContainer} onPress={() => handlePayment(3)}>
                        <Text style={styles.amount}>Rp 18.000</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../assets/crystal.png")} />
                    </View>
                    <Text style={styles.gems}>6 Gems</Text>
                    <TouchableOpacity style={styles.amountContainer} onPress={() => handlePayment(6)}>
                        <Text style={styles.amount}>Rp 36.000</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../assets/treasure4.png")} />
                    </View>
                    <Text style={styles.gems}>12 Gems</Text>
                    <TouchableOpacity style={styles.amountContainer} onPress={() => handlePayment(12)}>
                        <Text style={styles.amount}>Rp 72.000</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../assets/treasure3.png")} />
                    </View>
                    <Text style={styles.gems}>24 Gems</Text>
                    <TouchableOpacity style={styles.amountContainer} onPress={() => handlePayment(24)}>
                        <Text style={styles.amount}>Rp 146.000</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../assets/treasure2.png")} />
                    </View>
                    <Text style={styles.gems}>48 Gems</Text>
                    <TouchableOpacity style={styles.amountContainer} onPress={() => handlePayment(48)}>
                        <Text style={styles.amount}>Rp 288.000</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F6F8FF",
        height: "100%",
    },
    header: {
        width: "100%",
        height: "6%",
        // backgroundColor: "yellow",
        marginTop: 50,
        justifyContent: "center",
        alignContent: "center",
    },
    fontHeader: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "#0A7F7F",
    },
    options: {
        // backgroundColor:'pink',
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    rowContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#0A7F7F",
        width: "100%",
        height: "16%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 10,
    },
    imageContainer: {
        width: "11%",
        height: "90%",
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "120%",
        height: "60%",
        borderRadius: 100,
    },
    amountContainer: {
        width: "30%",
        height: "50%",
        borderRadius: 10,
        backgroundColor: "#0A7F7F",
        justifyContent: "center",
        alignItems: "center",
    },
    amount: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white",
    },
    gems: {
        fontSize: 13,
        fontWeight: "bold",
    },
});
