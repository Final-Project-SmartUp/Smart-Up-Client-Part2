import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import store from "./stores";
import Register from "./Screens/RegisterScreen";
import LandingPage from "./Screens/LandingScreen";
import CategoryDetail from "./Screens/CategoryDetailScreen";
import Gamescreen from "./Screens/GameScreen";
import ResultScreen from "./Screens/ResultScreen";
import LoginPage from "./Screens/LoginScreen";
import HomePage from "./Screens/HomePageScreen";
// import HomePage from "./Screens/HomePageScreen";
import ProfilePage from "./Screens/ProfileScreen";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import AddPost from "./Screens/AddPostScreen";
import PostDetail from "./Screens/PostDetailScreen";
import AddCommentScreen from "./Screens/AddCommentScreen";

import EditProfile from "./Screens/EditProfile";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const ShowTab = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;

//                     if (route.name === "HomePage") {
//                         iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
//                     } else if (route.name === "MENU") {
//                         iconName = focused ? "restaurant" : "restaurant-outline";
//                     } else if (route.name === "Countries") {
//                         iconName = focused ? "map" : "map-outline";
//                     }

//                     return <Ionicons name={iconName} size={size} color={color} />;
//                 },
//                 tabBarActiveTintColor: "tomato",
//                 tabBarInactiveTintColor: "gray",
//                 headerShown: false,
//             })}
//         >
//             <Tab.Screen name="CategoryDetail" component={CategoryDetail} />
//         </Tab.Navigator>
//     );
// };

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
                                {/* <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />

                                <Stack.Screen name="Login" component={LoginPage} /> */}
                                <Stack.Screen name="ProfileScreen" component={ProfilePage}/>
                                <Stack.Screen name="Home" component={HomePage} />
                                <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
                                <Stack.Screen name="PostDetailScreen" component={PostDetail} />
                                <Stack.Screen name="AddPostScreen" component={AddPost} />

                                <Stack.Screen name="AddCommentScreen" component={AddCommentScreen} />
                                {/* <Stack.Screen name="Home" component={ShowTab} options={{ headerShown: false }} /> */}
                                <Stack.Screen name="Gamescreen" component={Gamescreen} />
                                <Stack.Screen name="ResultScreen" component={ResultScreen} />
                                <Stack.Screen name="EditProfile" component={EditProfile}/>
                            </>
                        ) : (
                            <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </SafeAreaView>
    );
}
