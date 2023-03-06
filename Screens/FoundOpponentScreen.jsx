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
import ProfilePicture from "../Components/ProfilePicture";

export default function FoundOpponentScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.player1Container}>
        <View>
          <Text style={styles.textPlayer1Name}>Fahmi</Text>
          <Text style={styles.textPlayer1Year}> 2022 </Text>
        </View>
        <View style={styles.player1Profile}>
          <Image
            style={styles.image}
            source={{
              uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
            }}
          />
        </View>
      </View>
      <View style={styles.versusContainer}>
        <View style={styles.versus}>
          <View style={styles.whiteCircle}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>VS</Text>
          </View>
        </View>
      </View>
      <View style={styles.player2Container}>
        <View style={styles.player2Profile}>
          <Image
            style={styles.image}
            source={{
              uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
            }}
          />
        </View>
        <View>
          <Text style={styles.textPlayer2Name}>Beauty</Text>
          <Text style={styles.textPlayer2Year}> 2022 </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  player1Container: {
    backgroundColor: "#D8EBEB",
    height: "45%",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  player1Profile: {
    width: "25%",
    height: "27%",
    backgroundColor: "#FFE59E",
    borderRadius: 100,
    marginRight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: 100,
  },
  textPlayer1Name: {
    marginRight: 20,
    fontSize: 35,
    fontWeight: "bold",
  },
  textPlayer1Year: {
    marginLeft: 48,
    fontSize: 20,
  },
  versusContainer: {
    backgroundColor: "#F2CAC0",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  versus: {
    width: "20%",
    height: "100%",
    backgroundColor: "#F2CAC0",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteCircle: {
    width: "85%",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  player2Container: {
    backgroundColor: "#FFE59E",
    height: "45%",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  player2Profile: {
    width: "25%",
    height: "27%",
    backgroundColor: "#D8EBEB",
    borderRadius: 100,
    marginLeft: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textPlayer2Name: {
    marginLeft: 20,
    fontSize: 35,
    fontWeight: "bold",
  },
  textPlayer2Year: {
    marginLeft: 18,
    fontSize: 20,
  },
});
