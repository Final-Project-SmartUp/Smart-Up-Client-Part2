import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../helpers/ip";
import { fetchPost } from "../stores/actions/actionCreator";

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

    const [message, setMessage] = useState();

    const handleAddComment = () => {
        navigation.navigate("AddCommentScreen", postId);
    };

    const handleGoBack = () => {
        navigation.navigate("CategoryDetail", { categoryId: post.CategoryId });
    };

    if (loadingUserPost || fetchPostLoading) {
        return <Text>Masih Loading....</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
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
                <View>
                    <TouchableOpacity onPress={() => handleAddComment()}>
                        <Text>Add Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGoBack(post.CategoryId)}>
                        <Text>Go Back</Text>
                    </TouchableOpacity>
                </View>

                {post.Comments.map((comment, i) => {
                    return (
                        <View key={`comment ${i}`} style={styles.profileReplyContainer}>
                            <View style={styles.profileImageReplyContainer}>
                                <Image
                                    style={styles.imageReply}
                                    source={{
                                        uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                                    }}
                                />
                            </View>

                            <View style={styles.replyContainer}>
                                <Text style={styles.textProfileNameReply}>{comment.profileName}</Text>
                                <View style={styles.boxComment}>
                                    <View style={styles.commentContainer}>
                                        <Text style={styles.reply}>{comment.description}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}

                {/* <View style={styles.profileReplyContainerNext}>
                    <View style={styles.profileImageReplyContainerNext}>
                        <Image
                            style={styles.imageReply}
                            source={{
                                uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                            }}
                        />
                    </View>
                    <View style={styles.replyContainer}>
                        <Text style={styles.textProfileNameReply}>Willy Chu</Text>
                        <View style={styles.boxCommentNext}>
                            <View style={styles.commentContainerNext}>
                                <Text style={styles.reply}>Mr Chu ipsul yeyeyeyey </Text>
                            </View>
                        </View>
                    </View>
                </View> */}
            </View>
            <View style={styles.postReplyContainer}>
                <TextInput placeholder="Message" placeholderTextColor="#C0C0C0" editable multiline numberOfLines={4} maxLength={40} value={message} onChangeText={(message) => setMessage(message)} style={styles.textInput} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white",
    },
    insideContainer: {
        height: "90%",
        padding: 15,
        // backgroundColor:'pink'
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
        backgroundColor: "#A8D978",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
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
    textProfileName: {
        marginLeft: 10,
        fontSize: 18,
        flexDirection: "row",
    },
    boldStyle: {
        fontWeight: "bold",
    },
    image: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
    },
    postContainer: {
        height: "auto",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textPost: {
        fontSize: 15,
    },
    profileReplyContainer: {
        height: "10%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 5,
        alignItems: "center",
        marginTop: 1,
        backgroundColor: "red",
    },
    profileReplyContainerNext: {
        height: "15%",
        flexDirection: "row",
        marginLeft: 5,
        // backgroundColor:'yellow',
        // alignItems:'center',
        marginBottom: 10,
    },

    profileImageReplyContainer: {
        width: "8%",
        height: "30%",
        backgroundColor: "#A8D978",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },

    imageReply: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: "contain",
    },
    textProfileNameReply: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 13,
    },
    replyContainer: {
        justifyContent: "flex-start",
    },
    boxComment: {
        width: "auto",
        height: "auto",
        marginTop: 3,
    },
    boxCommentNext: {
        width: "auto",
        height: "auto",
        marginTop: 3,
        // backgroundColor:'yellow',
    },
    commentContainer: {
        backgroundColor: "#ebe9e6",
        marginLeft: 10,
        borderRadius: 15,
        padding: 3,
        width: "auto",
        // alignItems: "center",
        paddingRight: 3,
    },
    commentContainerNext: {
        backgroundColor: "#ebe9e6",
        marginLeft: 10,
        borderRadius: 15,
        padding: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    comment: {
        marginLeft: 10,
    },
    reply: {
        fontSize: 12,
    },

    postReplyContainer: {
        height: "8%",
        width: "100%",
        backgroundColor: "#F2CAC0",
        marginBottom: 1,
        marginTop: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        backgroundColor: "white",
        justifyContent: "center",
        width: "90%",
        height: "50%",
        borderRadius: 20,
        padding: 4,
    },
});
