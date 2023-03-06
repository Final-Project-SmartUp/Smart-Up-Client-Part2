import { StyleSheet, View, Text, Image } from "react-native";

export default function Post() {
  return (
   <>
      <View style={styles.postContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
            }}
          />
        </View>
        <Text style={styles.textProfileName}>Daffa the Boy</Text>
      </View>
      <View style={styles.postContainer}>
        <Text style={styles.textPost}>
          we are the muses goddes of the arts and proclaimers of heroes, heroes
          like herculers
        </Text>
      </View>
      <View style={styles.replyIconContainer}>
        <View style={styles.replyIcon}>
          <Image
            style={styles.icon}
            source={require("../assets/icons8-response-80.png")}
          />
        </View>
      </View>
   </>


  );
}

const styles = StyleSheet.create({

  textButton: {
    color: "white",
  },
  textProfileName: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  postContainer: {
    height: "auto",
    borderBottomWidth: 1,
    backgroundColor:'red',
    marginTop:30

  },
  postContainer: {
    height: "15%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  profileContainer: {
    width: "13%",
    height: "120%",
    backgroundColor: "black",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    
  },
  textPost: {
    marginBottom: 10,
    marginTop: 10,
  },
  replyIconContainer: {
    height: 50,
    justifyContent: "center",
    marginBottom: 5,
  },
  replyIcon: {
    width: "10%",
    height: "70%",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: 100,
  },
});
