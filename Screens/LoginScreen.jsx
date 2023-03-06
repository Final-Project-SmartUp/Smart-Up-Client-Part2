import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../stores/actions/actionCreator";

const LoginPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function getEmailDataValue(e) {
        setEmail(e);
    }
    function getPasswordDataValue(e) {
        setPassword(e);
    }

    const handleLogin = async (e) => {
        try {
            await dispatch(
                login({
                    email: email,
                    password: password,
                })
            );
            navigation.navigate("Home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Image source={require("../assets/image.png")} style={styles.image} />
                    <Text style={styles.textHeader}>More than just a game</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput placeholderTextColor="#C0C0C0" placeholder="Email" editable multiline numberOfLines={4} maxLength={40} value={email} onChangeText={(email) => getEmailDataValue(email)} style={styles.textInput} />
                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        placeholder="Min. 5 characters"
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry={true}
                        password={true}
                        editable
                        numberOfLines={4}
                        maxLength={40}
                        value={password}
                        onChangeText={(password) => getPasswordDataValue(password)}
                        style={styles.textInput}
                    />
                </View>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.textButton}>LOGIN</Text>
                </Pressable>
            </View>
       
    );
};

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 300,
        marginBottom: 10,
        marginTop: 5,
    },
    container: {
        // flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE59E",
    },
    textContainer: {
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    textHeader: {
        textAlign: "center",
        marginBottom: 9,
        fontSize: 20,
        color: "#8d4e42",
        fontWeight: "bold",
    },
    text: {
        marginTop: 23,
        color: "#8d4e42",
        fontWeight: "bold",
        fontSize: 18,
    },
    textInputContainer: {
        // flex: 1,
        marginTop: 80,
        width: "90%",
        height: "40%",
        marginBottom: 3,
    },
    textInput: {
        textAlignVertical: "center",
        flexDirection: "row",
        padding: 5,
        paddingLeft: 15,
        fontSize: 15,
        // flex: 2,
        marginTop: 10,
        borderRadius: 30,
        paddingTop: 5,
        height: "15%",
        backgroundColor: "white",
    },
    button: {
        marginTop: 5,
        width: "60%",
        height: "8%",
        marginBottom: 74,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: "#8d4e42",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default LoginPage;
