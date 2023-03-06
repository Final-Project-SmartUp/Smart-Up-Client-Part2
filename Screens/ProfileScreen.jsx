import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      <Image
        style={styles.profileImage}
        source={{uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'}}
      />
      <Text style={styles.name}>Daffa Sarung</Text>
      <Text style={styles.description}>Quiz Profile</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.statMmrContainer}>
          <Text style={styles.statRank}>MMR</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.statRankContainer}>
          <Text style={styles.statRank}>Rank</Text>
          <Text style={styles.statValue}>50</Text>
        </View>
        <View style={styles.statPostContainer}>
          <Text style={styles.statPost}>Posts</Text>
          <Text style={styles.statValue}>25</Text>
        </View>
      </View>
      <View style={styles.accountContainer}>
        <Text>Hi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'yellow',
    height:'100%',
    justifyContent:'flex-start'
  },
  profileContainer:{
    // flex:1,
    marginTop:50,
    // backgroundColor:'red',
    width:'100%',
    height:'30%',
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:20,
    // backgroundColor:'red',
    justifyContent:'flex-start'
  },

  statMmrContainer: {
    alignItems: 'center',
    marginRight:100,
    marginLeft:30,
    justifyContent:'flex-start',
    backgroundColor:'yellow'
  },
  statRankContainer: {
    alignItems: 'center',
    marginRight:120,
    marginLeft:20,
    backgroundColor:'yellow'
  },
  statRank: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statPostContainer: {
    alignItems: 'center',
    backgroundColor:'yellow',
  },
  statPost: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    color: '#777',
  },
  accountContainer:{
    backgroundColor:'purple',
    width:'100%',
    height:'70%',
    marginTop:30,
    borderRadius:60,
    justifyContent:'flex-start',
    paddingTop:60,
    alignItems:'center'
  }
});

export default ProfilePage;