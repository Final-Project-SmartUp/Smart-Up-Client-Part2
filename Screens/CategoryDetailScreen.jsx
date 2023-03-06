import { useEffect, useState } from "react";
import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "../config/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { onSnapshot } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { BASE_URL } from "../helpers/ip";
import Post from "../Components/Post";

export default function CategoryDetail({ navigation, route }) {
    const categoryId = route.params;
    const [categoryDetail, setCategoryDetail] = useState();
    const [allPosts, setAllPosts] = useState();
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingCategoryDetail, setLoadingCategoryDetail] = useState(true);
    const [currentUser, setCurrentUser] = useState({
        userId: "",
        username: "",
        isFindMatch: "",
        isPlaying: "",
    });

    const playGame = async () => {
        try {
            const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
            const newUpdate = await updateDoc(userRef, {
                isFindMatch: true,
            });
        } catch (err) {
            console.log(err);
        }
    };
    console.log(allPosts);
    //! Fetch Category Detail
    useEffect(() => {
        (async () => {
            try {
                const { data: CategoryDetail } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3000/categories/${categoryId}`,
                    headers: {
                        access_token: await AsyncStorage.getItem("access_token"),
                    },
                });

                setCategoryDetail(CategoryDetail);
                setLoadingCategoryDetail(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [categoryId]);

    //! Fetch All Posts By CategoryId
    useEffect(() => {
        (async () => {
            try {
                const { data: Posts } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3000/posts/${categoryId}`,
                    headers: {
                        access_token: await AsyncStorage.getItem("access_token"),
                    },
                });
                setAllPosts(Posts);
                setLoadingPosts(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        async function setUser() {
            const userId = await AsyncStorage.getItem("userId");
            const { data } = await axios({
                method: "GET",
                url: `http://${BASE_URL}:3001/users/${userId}`,
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                },
            });

            setCurrentUser({
                userId: data.id,
                username: data.username,
                isFindMatch: data.isFindMatch,
                isPlaying: data.isPlaying,
            });
        }
        setUser();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const unsubscribe = onSnapshot(doc(db, "users", await AsyncStorage.getItem("userId")), async (doc) => {
                    const user = doc.data();
                    const userId = await AsyncStorage.getItem("userId");
                    const token = await AsyncStorage.getItem("access_token");
                    if (user.isFindMatch) {
                        const { data: allRooms } = await axios({
                            method: "GET",
                            url: `http://${BASE_URL}:3001/rooms`,
                            headers: {
                                access_token: await AsyncStorage.getItem("access_token"),
                            },
                        });

                        if (allRooms.length === 0) {
                            const { data: newRoom } = await axios({
                                method: "POST",
                                url: `http://${BASE_URL}:3001/rooms/createRoom/${userId}`,
                                headers: {
                                    access_token: await AsyncStorage.getItem("access_token"),
                                },
                            });
                            console.log(newRoom, "buat room baru");

                            navigation.navigate("Gamescreen", {
                                roomId: newRoom.id,
                            });
                        }

                        if (allRooms.length > 0 && allRooms[0].player2 === null) {
                            const { data: joinRoom } = await axios({
                                method: "PUT",
                                url: `http://${BASE_URL}:3001/rooms/${allRooms[0].id}`,
                                headers: {
                                    access_token: await AsyncStorage.getItem("access_token"),
                                },
                                data: {
                                    userId,
                                },
                                headers: {
                                    access_token: token,
                                },
                            });
                            console.log(joinRoom, "player 2 terisi bung");

                            navigation.navigate("Gamescreen", {
                                roomId: allRooms[0].id,
                                categoryValue: categoryDetail.value,
                            });
                        }
                    }
                });

                return unsubscribe;
            } catch (err) {
                console.log(err);
            } finally {
                const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
                const newUpdate = await updateDoc(userRef, {
                    isFindMatch: false,
                });
            }
        })();
    }, []);

    //! Add Post
    const handleAddPost = () => {
        navigation.navigate("AddPostScreen");
    };

    if (loadingCategoryDetail) {
        return <Text>Masih Loading categoryDetail...</Text>;
    }

    if (loadingPosts) {
        return <Text>Masih Loading Posts....</Text>;
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.firstPartContainer}>
                    <View style={styles.categoryName}>
                        <Text style={styles.textCategoryName}>{categoryDetail.name}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imageCategory}
                            source={{
                                uri: "https://img.freepik.com/free-vector/characters-celebrating-holi-festival-concept_23-2148405462.jpg?w=1060&t=st=1677830591~exp=1677831191~hmac=cb58a785423477d3131c5bc4d671edd861a29192d02521e4fe9431928c177f8e",
                            }}
                        />
                    </View>
                    <View style={styles.borderImage}>
                        <Pressable onPress={playGame}>
                            <Text style={styles.textButton}>Play Game</Text>
                        </Pressable>
                    </View>
                </View>
                <ScrollView style={styles.borderLine}>
                    <TouchableOpacity onPress={() => handleAddPost(categoryId)}>
                        <Text>Add Post</Text>
                    </TouchableOpacity>
                    {allPosts.length !== 0 ? (
                        allPosts.map((el, i) => {
                            return <Post key={`post ${i}`} />;
                        })
                    ) : (
                        <Text>Not Post available yet...</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
    container: {
        height: "100%",
        // backgroundColor: "red",
    },
    firstPartContainer: {
        alignItems: "center",
        height: "35%",
        // backgroundColor: "white",
        marginBottom: 20,
    },
    categoryName: {
        height: "10%",
        width: "100%",
        marginTop: 20,
    },
    textCategoryName: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#B19C77",
    },
    imageContainer: {
        backgroundColor: "#FEE4BD",
        width: "37%",
        height: "50%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    imageCategory: {
        width: "80%",
        height: "80%",
    },
    borderImage: {
        backgroundColor: "#B19C77",
        marginTop: 30,
        width: "35%",
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderColor: "#FEE4BD",
    },
    borderLine: {
        width: "100%",
        height: "65%",
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: "grey",
    },
});
