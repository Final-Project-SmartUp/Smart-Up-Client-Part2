import { useCallback, useEffect, useState } from "react";
import { TextInput, View, Button, Text, ScrollView, Pressable, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "../config/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { onSnapshot } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { BASE_URL } from "../helpers/ip";
import Post from "../Components/Post";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../stores/actions/actionCreator";
import Loading from "../Components/Loading";

export default function CategoryDetail({ navigation, route }) {
    const { categoryId } = route.params;
    const [categoryDetail, setCategoryDetail] = useState();
    const [allPosts, setAllPosts] = useState();
    const [loadingCategoryDetail, setLoadingCategoryDetail] = useState(true);
    const [currentUser, setCurrentUser] = useState({
        userId: "",
        username: "",
        isFindMatch: "",
        isPlaying: "",
    });
    const dispatch = useDispatch();
    const { fetchPostsLoading, posts, errorMsg } = useSelector((state) => state.post);

    //! Aktifkan tombol findMatch (isFindMatch Jadi True)
    const playGame = async () => {
        try {
            const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
            await updateDoc(userRef, {
                isFindMatch: true,
            });
        } catch (err) {
            console.log(err);
        }
    };

    //! Fetch Category Detail untuk tampilan
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
        dispatch(fetchPosts(categoryId));
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

    //! Listen pada room
    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const unsubscribe = onSnapshot(doc(db, "users", await AsyncStorage.getItem("userId")), async (doc) => {
                        const user = doc.data();
                        const userId = await AsyncStorage.getItem("userId");
                        const token = await AsyncStorage.getItem("access_token");
                        if (user.isFindMatch) {
                            const { data: allRooms } = await axios({
                                method: "GET",
                                url: `http://${BASE_URL}:3001/rooms/getRoom/${categoryId}`,
                                headers: {
                                    access_token: await AsyncStorage.getItem("access_token"),
                                },
                            });

                            //! Create Room and Join Room
                            if (allRooms.length === 0) {
                                const { data: newRoom } = await axios({
                                    method: "POST",
                                    url: `http://${BASE_URL}:3001/rooms/createRoom/${userId}`,
                                    headers: {
                                        access_token: await AsyncStorage.getItem("access_token"),
                                    },
                                    data: {
                                        categoryId: categoryId,
                                    },
                                });
                                console.log(newRoom, "buat room baru");

                                navigation.navigate("Gamescreen", {
                                    roomId: newRoom.id,
                                });
                            } else if (allRooms.length > 0 && allRooms[0].player2 === null) {
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
                                navigation.navigate("Gamescreen", {
                                    roomId: allRooms[0].id,
                                });
                            }
                        }
                    });

                    return () => unsubscribe();
                } catch (err) {
                    console.log(err);
                }
            })();
        }, [])
    );

    //! Buat Room pake useEffect listen pada update Room
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const unsubscribe = onSnapshot(doc(db, "users", await AsyncStorage.getItem("userId")), async (doc) => {
    //                 const user = doc.data();
    //                 const userId = await AsyncStorage.getItem("userId");
    //                 const token = await AsyncStorage.getItem("access_token");

    //                 if (user.isFindMatch) {
    //                     const { data: allRooms } = await axios({
    //                         method: "GET",
    //                         url: `http://${BASE_URL}:3001/rooms/getRoom/${categoryId}`,
    //                         headers: {
    //                             access_token: await AsyncStorage.getItem("access_token"),
    //                         },
    //                     });
    //                     //! Create Room
    //                     if (allRooms.length === 0) {
    //                         const { data: newRoom } = await axios({
    //                             method: "POST",
    //                             url: `http://${BASE_URL}:3001/rooms/createRoom/${userId}`,
    //                             headers: {
    //                                 access_token: await AsyncStorage.getItem("access_token"),
    //                             },
    //                             data: {
    //                                 categoryId: categoryId,
    //                             },
    //                         });
    //                         console.log(newRoom, "buat room baru");

    //                         navigation.navigate("Gamescreen", {
    //                             roomId: newRoom.id,
    //                         });
    //                     }

    //                     if (allRooms.length > 0 && allRooms[0].player2 === null) {
    //                         const { data: joinRoom } = await axios({
    //                             method: "PUT",
    //                             url: `http://${BASE_URL}:3001/rooms/${allRooms[0].id}`,
    //                             headers: {
    //                                 access_token: await AsyncStorage.getItem("access_token"),
    //                             },
    //                             data: {
    //                                 userId,
    //                             },
    //                             headers: {
    //                                 access_token: token,
    //                             },
    //                         });
    //                         console.log(joinRoom, "player 2 terisi bung");

    //                         navigation.navigate("Gamescreen", {
    //                             roomId: allRooms[0].id,
    //                         });
    //                     }
    //                 }
    //             });

    //             return () => unsubscribe();
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     })();
    // }, []);

    //! Pindah ke halaman add Post
    const handleAddPost = () => {
        navigation.navigate("AddPostScreen", categoryId);
    };

    if (loadingCategoryDetail) {
        return <Loading />;
    }

    if (fetchPostsLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.firstPartContainer}>
                    <View style={styles.categoryName}>
                        <Text style={styles.textCategoryName}>{categoryDetail.name}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imageCategory}
                            source={{
                                uri: categoryDetail.imageUrl,
                            }}
                        />
                    </View>
                    <View style={styles.borderImage}>
                        <Pressable onPress={playGame}>
                            <Text style={styles.textButton}>Play Game</Text>
                        </Pressable>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleAddPost(categoryId)} style={styles.postButton}>
                    <Text style={styles.textPost}>ADD POST</Text>
                </TouchableOpacity>
                <View style={styles.flatListContainer}>
                    <FlatList data={posts} renderItem={({ item }) => <Post data={item} navigation={navigation} />} keyExtractor={(item) => item.id} />
                </View>
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
    },
    firstPartContainer: {
        alignItems: "center",
        height: "35%",
        marginBottom: 20,
        borderBottomWidth: 1,
    },
    categoryName: {
        height: "10%",
        width: "100%",
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
    textButton: {
        fontWeight: "bold",
        color: "white",
    },
    postButton: {
        backgroundColor: "#B19C77",
        marginBottom: 3,
        height: "4%",
        width: "30%",
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    textPost: {
        fontWeight: "bold",
        color: "white",
    },
    flatListContainer: {
        flex: 1,
        width: "95%",
        alignSelf: "center",
        marginTop: 10,
    },
});
