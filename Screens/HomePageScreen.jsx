import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Pressable, Image, ScrollViewBase } from "react-native";

export default function HomePage() {
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
            <View style={styles.header}>
                <Text style={styles.fontHeader}>Choose Category</Text>
            </View>
            <ScrollView Veritical style={styles.scrollContainer}>
                <View style={styles.categoryContainer}>
                    <Pressable style={styles.categoryBox1}>
                        <Text style={styles.fontText}>MYTHOLOGY</Text>
                        {/* <Image style={styles.icon} source={require("../assets/icons8-mythology-62.png")} /> */}
                    </Pressable>
                    <Pressable style={styles.categoryBox2}>
                        <Text style={styles.fontText}>SCIENCE</Text>
                        {/* <Image style={styles.icon} source={require("../assets/icons8-biotech-48.png")} /> */}
                    </Pressable>
                    <Pressable style={styles.categoryBox2}>
                        <Text style={styles.fontText}>SCIENCE</Text>
                        {/* <Image style={styles.icon} source={require("../assets/icons8-biotech-48.png")} /> */}
                    </Pressable>
                    <Pressable style={styles.categoryBox2}>
                        <Text style={styles.fontText}>SCIENCE</Text>
                        {/* <Image style={styles.icon} source={require("../assets/icons8-biotech-48.png")} /> */}
                    </Pressable>
                    <Pressable style={styles.categoryBox2}>
                        <Text style={styles.fontText}>SCIENCE</Text>
                        {/* <Image style={styles.icon} source={require("../assets/icons8-biotech-48.png")} /> */}
                    </Pressable>
                    <Pressable style={styles.categoryBox2}>
                        <Text style={styles.fontText}>SCIENCE</Text>
                        {/* <Image style={styles.icon} source={require("../assets/icons8-biotech-48.png")} /> */}
                    </Pressable>
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
        height: "100%",
        padding: 10,
        width: "100%",
    },
    profileContainer: {
        // flex:1,
        marginTop: 40,
        height: "5%",
        width: "100%",
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
        height: "5%",
        marginTop: 20,
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
        height: "100%",
        // paddingBottom:600,
        // marginBottom:600
        // backgroundColor: "red",
    },
    categoryContainer: {
        // backgroundColor: "pink",
        height: "100%",
        marginTop: 10,
        padding: 30,
        alignItems: "center",
    },
    categoryBox1: {
        backgroundColor: "#A1D4D4",
        width: "90%",
        height: "15%",
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
