import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';



const MainMenu = ({ navigation }) => {
  const handleStartPress = () => {
    navigation.navigate('Quiz');
  };

  const handleLeaderboardPress = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMostCategories}>
      <Text style={{textAlign:'center'}}>
        Most Categories
      </Text>
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8ECA4',
  },
  containerMostCategories:{
    backgroundColor:"white", width:"100%", height:"20%", marginBottom:600, paddingLeft:10, justifyContent:'center', borderBottomWidth:2, borderColor:'grey'
  },
});

export default MainMenu;
