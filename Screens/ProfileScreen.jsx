import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'}}
      />
      <Text style={styles.name}>Daffa Sarung</Text>
      <Text style={styles.description}>Quiz Profile</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statTitle}>Total Score</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statTitle}>Rank</Text>
          <Text style={styles.statValue}>50</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statTitle}>Posts</Text>
          <Text style={styles.statValue}>25</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    width: '80%',
  },
  stat: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    color: '#777',
  },
});

export default ProfilePage;