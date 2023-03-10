import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Pressable, Image, ScrollViewBase, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Components/Loading";
import Categories from "../Components/Categories";
import Animated, { SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from "react-native-reanimated";
import { fontHeaderBold, fontHeaderSize, secondaryColor, tertiartyColor } from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../stores/actions/actionCreator";

export default function HomePage({ navigation }) {
    const [categories, setCategories] = useState();
    const [loadingCategories, setLoadingCategories] = useState(true);
    const { user, fetchUserLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    //! Pindah page ke category Detail yang dipilih
    const handleChooseCategory = (categoryId) => {
        navigation.navigate("CategoryDetail", { categoryId });
    };

    //! Fetch All Categories
    useEffect(() => {
        (async () => {
            try {
                const { data: categories } = await axios({
                    method: "GET",
                    url: `http://${BASE_URL}:3000/categories`,
                    headers: {
                        access_token: await AsyncStorage.getItem("access_token"),
                    },
                });
                dispatch(fetchUser());
                setCategories(categories);
                setLoadingCategories(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    if (loadingCategories) {
        return <Loading />;
    }

    const DATA = [
        {
            id: "1",
            title: "First Item",
            rrm: 300,
        },
        {
            id: "2",
            title: "Second Item",
            rrm: 300,
        },
        {
            id: "3",
            title: "Third Item",
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
        {
            id: "10",
            title: "Third Item",
            rrm: 300,
        },
        {
            id: "11",
            title: "Third Item",
            rrm: 300,
        },
    ];

    if (fetchUserLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profile}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: user?.image,
                        }}
                    />
                </View>
            </View>
            <View style={styles.header}>
                <Text style={styles.fontHeader}>Choose Category</Text>
            </View>
            <Animated.View entering={SlideInLeft} exiting={SlideInRight} style={styles.flatListContainer}>
                <Animated.FlatList entering={SlideInDown} exiting={SlideInUp} data={categories} renderItem={({ item }) => <Categories data={item} navigation={navigation} />} keyExtractor={(item) => item.id} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: secondaryColor,
    },
    profileContainer: {
        // flex:1,
        marginTop: 40,
        height: "6%",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    profile: {
        // backgroundColor: "yellow",
        width: "12%",
        height: "90%",
        marginRight: 10,

        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
    header: {
        height: "5%",
        // marginTop: 20,
        // flex:1,
        // backgroundColor:'yellow'
    },
    fontHeader: {
        fontSize: fontHeaderSize,
        fontWeight: fontHeaderBold,
        letterSpacing: 1,
        color: "#0A7F7F",
    },
    flatListContainer: {
        height: "85%",
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    scrollContainer: {
        width: "100%",
        // paddingBottom:600,
        // marginBottom:600
        backgroundColor: "red",
    },
    categoryContainer: {
        // backgroundColor: "pink",
        marginTop: 5,
        padding: 30,
        alignItems: "center",
    },
    categoryBox1: {
        backgroundColor: "#A1D4D4",
        width: "90%",
        height: "2%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 70,
        flexDirection: "row",
    },
    icon: {
        width: "10%",
        height: "50%",
        marginLeft: 10,
    },
    categoryBox2: {
        backgroundColor: "#A8D978",
        width: "90%",
        height: "15%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 70,
        flexDirection: "row",
    },
    fontText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
});
