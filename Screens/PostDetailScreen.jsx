import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PostDetailReply from "../Components/PostDetailReply";
import { primaryColor, secondaryColor, tertiartyColor } from "../config/colors";
import { BASE_URL } from "../helpers/ip";
import { fetchPost, fetchPosts } from "../stores/actions/actionCreator";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetail({ route, navigation }) {
    const postId = route.params;
    const [userPost, setUserPost] = useState();
    const [loadingUserPost, setLoadingUserPost] = useState(true);
    const { fetchPostLoading, post, errorMsg } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data: user } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3001/users/${post.UserId}`,
                });
                setUserPost(user);
                setLoadingUserPost(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [post]);

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, []);

    const handleAddComment = () => {
        navigation.navigate("AddCommentScreen", { postId });
    };

    const handleGoBack = () => {
        dispatch(fetchPosts(post.CategoryId));
        navigation.navigate("CategoryDetail", { categoryId: post.CategoryId });
    };

    if (loadingUserPost || fetchPostLoading) {
        return <Text>Masih Loading....</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.insideContainer}>
                <TouchableOpacity onPress={() => handleGoBack(post.CategoryId)} style={styles.pressableBack}>
                    <Text style={styles.textAdd}>Back</Text>
                </TouchableOpacity>
                <View style={styles.profileContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: userPost.image,
                            }}
                        />
                    </View>
                    <Text style={styles.textProfileName}>
                        <Text style={styles.boldStyle}>{userPost.profileName}</Text>
                        <Text> posted in</Text>
                        <Text style={styles.boldStyle}> {post.Category.name}</Text>
                    </Text>
                </View>
                <View style={styles.postContainer}>
                    <Text style={styles.textPost}>{post.description}</Text>
                </View>
                <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "grey" }}>
                    <TouchableOpacity onPress={() => handleAddComment(userPost.image)} style={styles.pressable}>
                        <Text style={styles.textAdd}>Reply</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.flatListContainer}>
                    <FlatList data={post.Comments} renderItem={({ item }) => <PostDetailReply data={item} />} keyExtractor={(item) => item.id} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
    },
    insideContainer: {
        height: "90%",
        padding: 15,
        marginLeft: 5,
    },
    pressableBack: {
        width: "20%",
        height: "4%",
        backgroundColor: primaryColor,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textAdd: {
        fontWeight: "bold",
        color: tertiartyColor,
    },
    profileContainer: {
        height: "15%",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginTop: 6,
    },
    profileImageContainer: {
        width: "17%",
        height: "60%",
        backgroundColor: primaryColor,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
    },
    textProfileName: {
        marginLeft: 10,
        fontSize: 18,
        flexDirection: "row",
    },
    boldStyle: {
        fontWeight: "bold",
    },
    postContainer: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "space-between",
    },

    textPost: {
        fontSize: 17,
    },
    pressable: {
        width: "20%",
        height: 30,
        backgroundColor: secondaryColor,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3,
        marginTop: 10,
        borderColor: tertiartyColor,
        borderStyle: "solid",
        borderWidth: 1,
    },

    profileImageReplyContainerNext: {
        width: "8%",
        height: "26%",
        backgroundColor: "#A8D978",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 9,
    },
    flatListContainer: {
        height: "70%",
    },

    profileReplyContainer: {
        height: "15%",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        alignItems: "center",
        marginTop: 1,
        backgroundColor: "red",
    },
    profileReplyContainerNext: {
        height: "15%",
        flexDirection: "row",
        marginLeft: 5,
        marginBottom: 10,
    },
});
