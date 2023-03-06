import { TextInput, View, Button, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

export default function Register() {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
      <View style={styles.container}>
      <View style={styles.textContainer}>
        <Image source={require("../assets/image.png")} style={styles.image} />
        <Text style={styles.textHeader}>More than just a game</Text>
      </View>
      <View style={styles.textInputContainer}>
      <Text style={styles.text}>Username</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#C0C0C0"
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          value={username}
          onChangeText={(username) => setUsername(username)}
          style={styles.textInput}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#C0C0C0"
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          placeholder="Min. 5 characters"
          placeholderTextColor="#C0C0C0"
          editable
          secureTextEntry={true}
          numberOfLines={4}
          maxLength={40}
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
        />
      </View>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>CREATE ACCOUNT</Text>
        </Pressable>
    </View>
    );
}
const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 300,
        marginBottom: 30,
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D8EBEB",
        paddingTop: 180,
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    textHeader: {
        textAlign: "center",
        marginBottom: 15,
        fontSize: 20,
        color: "#8d4e42",
        fontWeight: "bold",
    },
    text: {
        marginTop: 20,
        color: "#8d4e42",
        fontWeight: "bold",
        fontSize: 18,
    },
    textInputContainer: {
        height: "auto",
        marginTop: 20,
        width: "90%",
        marginBottom:10
    },
    textInput: {
        textAlignVertical: "center",
        flexDirection: "row",
        padding: 10,
        paddingLeft: 15,
        fontSize: 15,

        marginTop: 10,
        borderRadius: 30,
        paddingTop: 10,
        height: 50,
        backgroundColor: "white",
    },
    button: {
      marginTop: 40,
      width: "60%",
      height: "8%",
      marginBottom: 200,
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
