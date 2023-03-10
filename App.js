import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import store from "./stores";
import LandingPage from "./Screens/LandingScreen";
import CategoryDetail from "./Screens/CategoryDetailScreen";
import Gamescreen from "./Screens/GameScreen";
import ResultScreen from "./Screens/ResultScreen";
import LoginPage from "./Screens/LoginScreen";
import Register from "./Screens/RegisterScreen";
import HomePage from "./Screens/HomePageScreen";
import ProfilePage from "./Screens/ProfileScreen";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import AddPost from "./Screens/AddPostScreen";
import PostDetail from "./Screens/PostDetailScreen";
import AddCommentScreen from "./Screens/AddCommentScreen";
import Leaderboard from "./Screens/LeaderboardScreen";
import EditProfile from "./Screens/EditProfile";
import FriendRequestScreen from "./Screens/FriendRequestScreen";
import Payment from "./Screens/PaymentScreen";
import HandlePayment from "./Screens/HandlePayment";
import { tertiartyColor } from "./config/colors";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShowTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "HomePage") {
                        iconName = focused ? "ios-home" : "ios-home-outline";
                    } else if (route.name === "Leaderboard") {
                        iconName = focused ? "ios-podium" : "ios-podium-outline";
                    } else if (route.name === "FriendRequestScreen") {
                        iconName = focused ? "ios-people" : "ios-people-outline";
                    } else if (route.name === "ProfileScreen") {
                        iconName = focused ? "ios-person" : "ios-person-outline";
                    } else if (route.name === "PaymentScreen") {
                        iconName = focused ? "ios-card" : "ios-card-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: tertiartyColor,
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            })}
        >
            <Tab.Screen name="HomePage" component={HomePage} options={{ headerShown: false, title: "Home" }} />
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
            <Tab.Screen name="PaymentScreen" component={Payment} />
            <Tab.Screen name="FriendRequestScreen" component={FriendRequestScreen} options={{ title: "Friend Request" }} />
            <Tab.Screen name="ProfileScreen" component={ProfilePage} options={{ title: "Profile" }} />
        </Tab.Navigator>
    );
};

export default function App() {
    const [token, setToken] = useState();
    const [loadingToken, setLoadingToken] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setToken(await AsyncStorage.getItem("access_token"));
                setLoadingToken(false);
            } catch (err) {
                console.log(err);
            }
        })();
    });

    if (loadingToken) {
        return <Text>Masih loading...</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {token ? (
                            <>
                                <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
                                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                                <Stack.Screen name="Home" component={ShowTab} options={{ headerShown: false }} />
                                <Stack.Screen name="CategoryDetail" component={CategoryDetail} options={{title: ""}}/>
                                <Stack.Screen name="PostDetailScreen" component={PostDetail} options={{ headerShown: false }} />
                                <Stack.Screen name="HandlePayment" component={HandlePayment} options={{title: ""}}/>
                                <Stack.Screen name="AddPostScreen" component={AddPost} options={{title: ""}}/>
                                <Stack.Screen name="AddCommentScreen" component={AddCommentScreen} />
                                <Stack.Screen name="Gamescreen" component={Gamescreen} options={{ headerShown: false }} />
                                <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="EditProfile" component={EditProfile} options={{title: ""}}/>
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Login" component={LoginPage} />
                                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaView>
    );
}
