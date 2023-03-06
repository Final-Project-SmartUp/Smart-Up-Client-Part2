import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { BASE_URL } from "../helpers/ip";




const ProfilePage = ({navigation}) => {

  const [userData,setUserData] = useState({})
  const [fetchUserLoading,setFetchUserLoading] = useState(true)
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const userId = await AsyncStorage.getItem("userId")
        const {data:userData} = await axios({
          method:'get',
          url:`http://${BASE_URL}:3001/users/${userId}`
        })
        setUserData(userData)
        setFetchUserLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  },[])


  if(fetchUserLoading){
    return (
      <View>
        <Text>
          Loading...................
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.description}>Profile</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")}>
          <Text>
            EDIT!!!
          </Text>
        </TouchableOpacity>
        <Image
          style={styles.profileImage}
          source={{
            uri: userData.image,
          }}
        />
        <Text style={styles.name}>{userData?.profileName}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statMmrContainer}>
          <Text style={styles.statRank}>MMR</Text>
          <Text style={styles.statValue}>{userData?.mmr}</Text>
        </View>
        <View style={styles.statRankContainer}>
          <Text style={styles.statRank}>Rank</Text>
          <Text style={styles.statValue}>50</Text>
        </View>
      </View>
      <View style={styles.friendListContainer}>
        <View style={styles.friendList}>
          <Text style={styles.fontFriendList}>Friend List:</Text>
          <ScrollView Vertical style={{ height: "auto" }}>
            <View style={styles.categoryContainer}>
              <View style={{ width: "15%" }}>
                <View style={styles.categoryBox2}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                  />
                </View>
                <View style={styles.categoryBox2}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                  />
                </View>
                <View style={styles.categoryBox2}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                  />
                </View>
                <View style={styles.categoryBox2}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                  />
                </View>
                <View style={styles.categoryBox2}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                  />
                </View>
                <View style={styles.categoryBox2}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                    }}
                  />
                </View>
              </View>
              <View style={{ width: "57%", marginLeft: 30, marginTop: 10 }}>
                <Text style={styles.friendListFont}>Willy Chu</Text>
                <Text style={styles.friendListFont}>Beauty Dominique</Text>
                <Text style={styles.friendListFont}>Ananta Sophan</Text>
                <Text style={styles.friendListFont}>Sophia Latjuba</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9FADAD",
    height: "100%",
    justifyContent: "flex-start",
  },
  profileContainer: {
    // flex:1,
    marginTop: 50,
    // backgroundColor:'red',
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#C0C791",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  description: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    // backgroundColor:'red',
    justifyContent: "flex-start",
  },

  statMmrContainer: {
    alignItems: "center",
    marginRight: 97,
    marginLeft: 30,
    justifyContent: "flex-start",
    // backgroundColor:'yellow'
  },
  statRankContainer: {
    alignItems: "center",
    marginRight: 120,
    marginLeft: 20,
    // backgroundColor:'yellow'
  },
  statRank: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color:'white'
  },
  statPostContainer: {
    alignItems: "center",
    // backgroundColor:'yellow',
  },
  statPost: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color:'white'
  },
  statValue: {
    fontSize: 16,
    color: "white",
  },
  friendListContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    marginTop: 30,
    borderRadius: 60,
    justifyContent: "flex-start",
    paddingTop: 60,
    padding: 30,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  friendList: {
    justifyContent: "flex-start",
    // backgroundColor: "red",
    width: "100%",
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 100,
  },
  fontFriendList: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9FADAD",
  },
  categoryContainer: {
    // backgroundColor: "pink",
    height: "auto",
    marginTop: 5,
    padding: 30,
    // alignItems: "center",
    flexDirection: "row",
  },

  categoryBox2: {
    backgroundColor: "#9FADAD",
    width: "100%",
    height: "10%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    flexDirection: "row",
  },
  fontText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
  friendListFont: { marginBottom: 67 },
});

export default ProfilePage;
