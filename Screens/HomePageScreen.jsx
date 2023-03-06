import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Pressable, Image, ScrollViewBase, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({ navigation }) {
    const [categories, setCategories] = useState();
    const [loadingCategories, setLoadingCategories] = useState(true);

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
                setCategories(categories);
                setLoadingCategories(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    if (loadingCategories) {
        return <Text>Masih loading category....</Text>;
    }

    console.log(categories);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profile}>
                    {/* <Image
                        style={styles.image}
                        source={{
                            uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                        }}
                    /> */}
                </View>
            </View>
            <ScrollView Vertical style={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.fontHeader}>Choose Category</Text>
                </View>
                <View style={styles.categoryContainer}>
                    {categories?.map((category, i) => {
                        return (
                            <Pressable key={`categoriess ${i}`} style={styles.categoryBox1} onPress={() => handleChooseCategory(category.id)}>
                                <Text style={styles.fontText}>{category.name}</Text>
                                <Image
                                    style={styles.icon}
                                    source={{
                                        uri: category.imageUrl,
                                    }}
                                />
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

//   <View style={styles.container}>
// //   <View style={styles.profileContainer}>
// //   <View style={styles.profile}>
// //   <Image
//           style={styles.image}
//           source={{
//             uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
//           }}
//         />
//   </View>
//   </View>
//   <View style={styles.header}>
//   <Text style={styles.fontHeader}>Choose Category</Text>
//   </View>
//   <View style={styles.categoryContainer}>
//   <View style={styles.categoryBox1}>
//           <Text style={styles.fontText}>MYTHOLOGY</Text>
//           <Image style={styles.icon} source={require('../assets/icons8-mythology-62.png')}/>
//   </View>
//   <View style={styles.categoryBox2}>
//           <Text style={styles.fontText}>SCIENCE</Text>
//           <Image style={styles.icon} source={require('../assets/icons8-biotech-48.png')}/>
//   </View>
//   </View>
// </View>

//   )
// }
const styles = StyleSheet.create({
    container: {
        //  backgroundColor:'red',
        flex: 1,
        // height: "100%",
        padding: 10,
        // width: "100%",
    },
    profileContainer: {
        flex: 1,
        // marginTop: 40,
        // height: "5%",
        // width: "100%",
        // backgroundColor:'pink',
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    profile: {
        backgroundColor: "black",
        width: "10%",
        height: "90%",
        marginRight: 10,
        marginBottom: 5,
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
        // height: "5%",
        // marginTop: 20,
        flex: 1,
        // backgroundColor:'yellow'
    },
    fontHeader: {
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#E26A82",
    },
    scrollContainer: {
        width: "100%",
        // paddingBottom:600,
        // marginBottom:600
        // backgroundColor: "red",
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
// const styles = StyleSheet.create({

// container:{
//   // backgroundColor:'red',
//   // height:'100%',
//   padding:20
// },
// profileContainer:{
//   marginTop:10,
//   height:'10%',
//   // backgroundColor:'white',
//   justifyContent:'flex-end',
//   alignItems:'flex-end',
// },
// profile:{
//   backgroundColor:'black',
//   width:'13%',
//   height:'57%',
//   marginRight:10,
//   marginBottom:5,
//   borderRadius:100,
//   alignItems:'center',
//   justifyContent:'center'
// },
// image: {
//   width: "90%",
//   height: "90%",
//   borderRadius: 100,
// },
// header:{
//   height:'5%',
//   marginTop:20
//   // backgroundColor:'yellow'
// },
// fontHeader:{
//   fontSize:25,
//   fontWeight:'bold',
//   letterSpacing:1,
//   color:'#E26A82'

// },
// categoryContainer:{
//   backgroundColor:'white',
//   height:'85%',
//   marginTop:10,
//   padding:30,
//   alignItems:'center'
// },
// categoryBox1:{
//   backgroundColor:'#A1D4D4',
//   width:'90%',
//   height:'20%',
//   borderRadius:30,
//   justifyContent:'center',
//   alignItems:'center',
//   marginBottom:70,
//   flexDirection:'row'
// },
// icon: {
//   width: "20%",
//   height: "50%",
//   marginLeft:10
// },
// categoryBox2:{
//   backgroundColor:'#A8D978',
//   width:'90%',
//   height:'20%',
//   borderRadius:30,
//   justifyContent:'center',
//   alignItems:'center',
//   marginBottom:70,
//   flexDirection:'row'
// },
// fontText:{
//   color:'white',
//   fontWeight:'bold',
//   fontSize:20
// }

// })
