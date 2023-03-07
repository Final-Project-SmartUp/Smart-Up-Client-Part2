import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../helpers/ip";
import { fetchUser } from "../stores/actions/actionCreator";




const ProfilePage = ({navigation}) => {
  const dispatch = useDispatch()
  const [friendList,setFriendList] = useState([])
  const [friendListLoading,setFriendListLoading] = useState(true)
  const [rankLoading,setRankLoading] = useState(true)
  const [rank,setRank] = useState("NaN")
  const {user:userData,loading} = useSelector((state)=>{
    return state.user
  })
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  useEffect(()=>{
    (async()=>{
      try {
        const {data} = await axios({
          method:'get',
          url:`http://${BASE_URL}:3001/friends`,
          headers:{
            access_token : await AsyncStorage.getItem("access_token")
          }
        })
        setFriendList(data)
      } catch (err) {
        console.log(err)
      } finally{
        setFriendListLoading(false)
      }

    })()
  },[])

  useEffect(()=>{
    const fetchLeaderBoard = async()=>{
      const token = await AsyncStorage.getItem("access_token")
      const userId = await AsyncStorage.getItem("userId")
      try {
        const {data} = await axios({
          method:'get',
          url:`http://${BASE_URL}:3001/users/leaderboard`,
          headers:{
            access_token: token
          }
        })
        data.forEach((el,i)=>{
          console.log(el)
            if(el.id === userId){
              setRank(i+1)
            }
        })
        setRankLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchLeaderBoard()
  },[])
  if(loading || friendListLoading || rankLoading){
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
          <Text style={styles.statValue}>{rank}</Text>
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
              </View>
              <View style={{ width: "57%", marginLeft: 30, marginTop: 10 }}>
                {friendList?.map((el)=>{
                  return <Text key={el.id} style={styles.friendListFont}>{el.name}</Text>
                })}
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
