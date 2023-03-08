import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, Text, Image } from "react-native";
import { BASE_URL } from "../helpers/ip";

export default function Payment({navigation}) {
  
  const handlePayment = async(value)=>{
    console.log(value)
    const userToken = await AsyncStorage.getItem("access_token")
    try {
      const {data} = await axios({
        method:'post',
        url:`http://${BASE_URL}:3001/users/checkoutGem`,
        headers:{
          access_token : userToken
        },
        data:{
          totalGem: value
        }
      })
      navigation.navigate("HandlePayment",data.redirect_url)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fontHeader}>PAY TO WIN</Text>
      </View>
      <View style={styles.options}>
      <TouchableOpacity style={styles.rowContainer} onPress={()=>handlePayment(3)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/gems.png")}
          />
        </View>
        <Text style={styles.gems}>3 Gems</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rp 18.000</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rowContainer} onPress={()=>handlePayment(6)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/crystal.png")}
          />
        </View>
        <Text style={styles.gems}>6 Gems</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rp 36.000</Text>
        </View>
      </TouchableOpacity >
      <TouchableOpacity  style={styles.rowContainer} onPress={()=>handlePayment(12)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/treasure4.png")}
          />
        </View>
        <Text style={styles.gems}>12 Gems</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rp 72.000</Text>
        </View>
      </TouchableOpacity >
      <TouchableOpacity  style={styles.rowContainer} onPress={()=>handlePayment(24)} >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/treasure3.png")}
          />
        </View>
        <Text style={styles.gems}>24 Gems</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rp 146.000</Text>
        </View>
      </TouchableOpacity >
      <TouchableOpacity  style={styles.rowContainer} onPress={()=>handlePayment(48)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/treasure2.png")}
          />
        </View>
        <Text style={styles.gems}>48 Gems</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rp 288.000</Text>
        </View>
      </TouchableOpacity >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D3ECEB",
    height: "100%",
  },
  header: {
    width: "100%",
    height: "6%",
    // backgroundColor: "yellow",
    marginTop: 50,
    justifyContent:'center',
    alignContent:'center'
  },
  fontHeader:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    color:'#0A7F7F'
  },
  options:{
    // backgroundColor:'pink',
    marginTop:10,
    justifyContent:'center',
    alignItems:'center'
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderBottomColor:'#0A7F7F',
    width: "100%",
    height: "16%",
   
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  imageContainer: {
    width: "11%",
    height: "90%",
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "120%",
    height: "60%",
    borderRadius: 100,
  },
  amountContainer: {
    width: "30%",
    height: "50%",
    borderRadius: 10,
    backgroundColor: "#0A7F7F",
    justifyContent: "center",
    alignItems: "center",
  },
  amount:{
    fontSize:13,
    fontWeight:'bold',
    color:'white'
  },
  gems:{
    fontSize:13,
    fontWeight:'bold'
  }
});
