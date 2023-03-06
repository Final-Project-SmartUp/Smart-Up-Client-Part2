import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const MainMenu = ({ navigation }) => {
  const handleStartPress = () => {
    navigation.navigate('Quiz');
  };

  const handleLeaderboardPress = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <ImageBackground
      source={{uri:"https://images.unsplash.com/photo-1519680772-8b5c1b0c1b1a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2UlMjBjb2xvciUyMGNvbG9yc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"}}
      style={styles.backgroundImage}
      blurRadius={3}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Game</Text>
        <TouchableOpacity style={styles.button} onPress={handleStartPress}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLeaderboardPress}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE5F1',
    padding: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 64,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    padding: 16,
    backgroundColor: '#007aff',
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default MainMenu;