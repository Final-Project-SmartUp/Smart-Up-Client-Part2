import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../helpers/ip";
import { fetchUser } from "../stores/actions/actionCreator";
import FriendList from "../Components/FriendList";
import { FlatList } from "react-native";

const ProfilePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const [friendList, setFriendList] = useState([]);
    const [friendListLoading, setFriendListLoading] = useState(true);
    const { user: userData, loading } = useSelector((state) => {
        return state.user;
    });
    useEffect(() => {
        dispatch(fetchUser());
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios({
                    method: "get",
                    url: `http://${BASE_URL}:3001/friends`,
                    headers: {
                        access_token: await AsyncStorage.getItem("access_token"),
                    },
                });
                setFriendList(data);
            } catch (err) {
                console.log(err);
            } finally {
                setFriendListLoading(false);
            }
        })();
    }, []);
    if (loading || friendListLoading) {
        return (
            <View>
                <Text>Loading...................</Text>
            </View>
        );
    }

    const DATA = [
        {
            id: "1",
            title: "Beauty",
            rrm: 300,
        },
        {
            id: "2",
            title: "Willy Chu",
            rrm: 300,
        },
        {
            id: "3",
            title: "Hello",
            rrm: 300,
        },
        {
            id: "4",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "5",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "6",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "7",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "8",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "9",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "10",
            title: "Third Item",
            rrm: 300,
        },
    ];
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.postButtonContainer}>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.textPost}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.description}>Profile</Text>
                <Image
                    style={styles.profileImage}
                    source={{
                        uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
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
                {/* <View style={styles.statPostContainer}>
                    <Text style={styles.statPost}>Posts</Text>
                    <Text style={styles.statValue}>25</Text>
                </View> */}
            </View>
            <View style={styles.friendListContainer}>
                <View style={styles.friendList}>
                    <Text style={styles.fontFriendList}>Friend List:</Text>
                    <View style={styles.flatListContainer}>
                        <FlatList data={friendList} renderItem={({ item }) => <FriendList data={item} />} keyExtractor={(item) => item.id} />
                    </View>
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
        flex: 1,
        justifyContent: "flex-start",
    },
    profileContainer: {
        marginTop: 20,
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        // borderBottomWidth: 1,
        // backgroundColor: "red",
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
        // backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 20,
        marginLeft: 80,
        // justifyContent: "flex-start",
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
    },
    statRank: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "white",
    },
    statPostContainer: {
        alignItems: "center",
    },
    statPost: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "white",
    },
    statValue: {
        fontSize: 16,
        color: "white",
    },
    flatListContainer: {
        marginTop: 10,
    },
    friendListContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "70%",
        marginTop: 20,
        borderRadius: 60,
        justifyContent: "flex-start",
        paddingTop: 30,
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
        height: "auto",
        marginTop: 5,
        padding: 30,
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

    postButtonContainer: {
        alignItems: "flex-end",
        width: "100%",
        height: "3%",
        marginTop: 40,
    },
    postButton: {
        backgroundColor: "#A8D978",
        width: "25%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginRight: 10,
    },
    textPost: {
        fontWeight: "bold",
        color: "white",
    },
});

export default ProfilePage;
