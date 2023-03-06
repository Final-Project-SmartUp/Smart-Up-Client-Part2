import {
  TextInput,
  View,
  Button,
  Text,
  ScrollView,
  Pressable,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function FindMatchScreen() {
  return (
    <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1255/1255391.png?w=1060&t=st=1677923642~exp=1677924242~hmac=46f35970f35e91cf73413081d34e48cd7ae8919fb1c6c5339981049fd0b35dc7",
          }}
        />
        <Text style={styles.text} >Finding Opponent</Text>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>CANCEL</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6DAAA",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 100,
    marginTop:200
  },
  text:{
    marginTop:50,
    fontSize:35,
    fontWeight:'bold',
    letterSpacing:2
  },
  button: {
    marginTop: 170,
    width: "60%",
    height: "10%",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#F6DAAA",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    letterSpacing:2
  },
});
