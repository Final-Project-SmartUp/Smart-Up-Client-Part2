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
import HomePage from "./Screens/HomePageScreen";

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
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
                    <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="Register" component={Register} options={{ headerTitle: "" }} /> */}
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
                    {/* <Stack.Screen name="Home" component={ShowTab} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="Gamescreen" component={Gamescreen} />
                    <Stack.Screen name="ResultScreen" component={ResultScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
