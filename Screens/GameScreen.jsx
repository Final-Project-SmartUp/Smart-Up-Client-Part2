import { TextInput, View, Button, Text, ScrollView, Pressable, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import FindMatchScreen from "./FindMatchScreen";
import FoundOpponentScreen from "./FoundOpponentScreen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../config/firebaseConnection";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../helpers/ip";
import Loading from "../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../stores/actions/actionCreator";
import playSound from "../Components/Sound";

export default function Gamescreen({ route, navigation }) {
    const { roomId } = route.params;
    const [room, setRoom] = useState({});
    const [questions, setQuestions] = useState([]);
    const [time, setTime] = useState(10);
    const [loading, setLoading] = useState(true);
    const [loadingQuestion, setLoadingQuestion] = useState(true);
    const [counter, setCounter] = useState(0);
    const [options, setOptions] = useState();
    const [selected, setSelected] = useState();
    const [scorePlayer1, setScorePlayer1] = useState(0);
    const [scorePlayer2, setScorePlayer2] = useState(0);
    const [isAnswer, setIsAnswer] = useState(false);
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [powerUpLimit, setPowerUpLimit] = useState(2);
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();
    const { user: userData } = useSelector((state) => state.user);

    //! Player dalam device
    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    //! set Timer jalan ketika loading pemain dan loading soal selesai
    useFocusEffect(
        useCallback(() => {
            if (!loading && !loadingQuestion) {
                if (time > -1 && counter < 5) {
                    const interval = setInterval(() => {
                        setTime((prevTime) => {
                            if (prevTime === 0) {
                                setCounter((prevCounter) => prevCounter + 1);
                                setIsAnswer(false);
                                setIsFocused(false);
                                return time;
                            } else {
                                return prevTime - 1;
                            }
                        });
                    }, 1000);

                    if (counter >= 5) {
                        clearInterval(interval);
                    }

                    return () => clearInterval(interval);
                }
            }
        }, [loading, loadingQuestion])
    );

    //! Query Player 1 and Player 2 in the room
    useEffect(() => {
        if (room) {
            (async () => {
                const token = await AsyncStorage.getItem("access_token");
                try {
                    const { data: player1 } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3001/users/${room.player1}`,
                        headers: {
                            access_token: token,
                        },
                    });
                    const { data: player2 } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3001/users/${room.player2}`,
                        headers: {
                            access_token: token,
                        },
                    });
                    setPlayer1(player1);
                    setPlayer2(player2);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [room.player2]);

    //! Acak Jawaban
    useEffect(() => {
        if (questions.length !== 0) {
            if (counter < 5) {
                setOptions(handleShuffle([questions[counter]?.correctAnswer, ...questions[counter]?.incorrectAnswers]));
            } else if (counter === 5) {
                navigation.navigate("ResultScreen", roomId);
            }
        }
    }, [questions, counter]);

    //! Fetch Soal ketika sudah ada 2 pemain dalam 1 room
    useEffect(() => {
        if (!loading) {
            (async () => {
                try {
                    const { data: questions } = await axios({
                        method: "GET",
                        url: `http://${BASE_URL}:3000/questions/${room.category + 8}`,
                        headers: {
                            access_token: await AsyncStorage.getItem("access_token"),
                        },
                    });
                    await setQuestions(questions);
                    setLoadingQuestion(false);
                    playSound();
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [loading]);

    //! handleShuffle
    const handleShuffle = (optionsNew) => {
        return optionsNew.sort(() => Math.random() - 0.5);
    };

    //! membuat loading ketika player 2 belum masuk ke dalam room
    useEffect(() => {
        (async () => {
            try {
                const unsubscribe = onSnapshot(doc(db, "rooms", roomId), async (doc) => {
                    const room = doc.data(); //! ini isinya apa
                    if (room.player2 === null || !room) {
                        setLoading(true);
                    } else {
                        setRoom(room);
                        setLoading(false);
                    }
                });

                return () => unsubscribe();
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    //! handleCheck
    const handleCheck = async (option) => {
        setSelected(option);
        setIsAnswer(true);
        setIsFocused(true);
        if (option === questions[counter]?.correctAnswer) {
            if (room?.player1 === (await AsyncStorage.getItem("userId"))) {
                setScorePlayer1(scorePlayer1 + 1);
                const scoreRef = doc(db, "rooms", roomId);
                await updateDoc(scoreRef, {
                    scorePlayer1: room.scorePlayer1 + time,
                });
            } else if (room?.player2 === (await AsyncStorage.getItem("userId"))) {
                setScorePlayer2(scorePlayer2 + 1);
                const scoreRef = doc(db, "rooms", roomId);
                await updateDoc(scoreRef, {
                    scorePlayer2: room.scorePlayer2 + time,
                });
            }
        }
    };

    const handlePowerUp = async () => {
        if (powerUpLimit > 0) {
            //! Start of Kurangi Gem
            const userRef = doc(db, "users", await AsyncStorage.getItem("userId"));
            if (userData.gem > 0) {
                await updateDoc(userRef, {
                    gem: userData.gem - 1,
                });
                dispatch(fetchUser());
            } else {
                return null;
            }
            //! End of Gem berkurang satu

            setPowerUpLimit(powerUpLimit - 1);
            let newOptions = [];
            let num = 0;
            options.forEach((el) => {
                if (questions[counter].correctAnswer === el) {
                    newOptions.push(el);
                } else {
                    if (num == 0) {
                        newOptions.push(el);
                        num++;
                    }
                }
            });

            setOptions(newOptions);
        } else {
        }
    };
    //! loading sebelum game mulai
    if (loading) {
        return <FindMatchScreen roomId={roomId} navigation={navigation} />;
    }

    if (loadingQuestion) {
        return <FoundOpponentScreen roomId={roomId} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileScoreContainer}>
                <View style={styles.profileScore}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://img.freepik.com/free-vector/characters-celebrating-holi-festival-concept_23-2148405462.jpg?w=1060&t=st=1677830591~exp=1677831191~hmac=cb58a785423477d3131c5bc4d671edd861a29192d02521e4fe9431928c177f8e",
                        }}
                    />
                    <View style={styles.textScoreContainer}>
                        <Text>{player1.profileName}</Text>
                        <Text>{room?.scorePlayer1}</Text>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Time Left</Text>
                    <Text>{time}</Text>
                </View>
                <View style={styles.profileScore}>
                    <View style={(styles.textScoreContainer, { paddingRight: 5 })}>
                        <Text>{player2.profileName}</Text>
                        <Text style={{ textAlign: "right" }}>{room?.scorePlayer2}</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://img.freepik.com/free-vector/characters-celebrating-holi-festival-concept_23-2148405462.jpg?w=1060&t=st=1677830591~exp=1677831191~hmac=cb58a785423477d3131c5bc4d671edd861a29192d02521e4fe9431928c177f8e",
                        }}
                    />
                </View>
            </View>
            <View style={styles.helper}>
                <View style={styles.gemContainer}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.iconGem} source={require("../assets/icons8-sparkling-diamond-100.png")} />
                    </View>
                    <View>
                        <Text>{userData?.gem}</Text>
                    </View>
                </View>
                <View style={styles.gemContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={handlePowerUp}>
                        <Image style={styles.iconPowerUp} source={require("../assets/power.png")} />
                    </TouchableOpacity>
                </View>
            </View>

            {counter < 5 ? (
                <>
                    <View style={styles.questionBoxContainer}>
                        <View style={styles.questionBox}>
                            <Text style={styles.question}>{questions[counter].question}</Text>
                        </View>
                    </View>

                    <View style={styles.answerContainer}>
                        {options?.map((option, i) => {
                            return isAnswer ? (
                                <TouchableOpacity key={`answered ${i}`} style={[styles.answerA, isFocused && styles.focusedButton]} onPress={() => handleCheck(option)} disabled={true}>
                                    <Text style={[styles.textAnswer]}>{option}</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity key={`answeredd ${i}`} style={styles.answerA} onPress={() => handleCheck(option)}>
                                    <Text style={styles.textAnswer}>{option}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    focusedButton: {
        backgroundColor: "red",
    },
    container: {
        backgroundColor: "#F6F8FF",
        height: "100%",
        width: "100%",
    },
    profileScoreContainer: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 37,
    },
    profileScore: {
        width: 50,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: "90%",
        height: "90%",
        borderRadius: 100,
    },
    textScoreContainer: { marginLeft: 10, justifyContent: "center", flexDirection: "column" },
    timeContainer: {
        width: "auto",
        height: "80%",
        alignItems: "center",
        paddingLeft: 30,
    },
    profileScoreLeftContainer: {
        width: "20%",
        height: "80%",
        flexDirection: "row",
    },
    profileScoreLeft: {
        marginLeft: 10,
        justifyContent: "center",
        marginRight: 10,
        alignItems: "flex-end",
    },
    helper: {
        width: "100%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    gemContainer: {
        width: "30%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        // backgroundColor:'white'
    },
    iconContainer: {
        width: "30%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
    iconGem: {
        width: "70%",
        height: "70%",
        borderRadius: 100,
    },
    iconPowerUp: {
        width: "110%",
        height: "90%",
        borderRadius: 100,
        marginLeft: 40,
    },
    questionBoxContainer: {
        width: "100%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
    },
    questionBox: {
        backgroundColor: "white",
        width: "80%",
        height: "90%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
    },
    question: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    answerContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    answerA: {
        backgroundColor: "#FFC3BD",
        width: "70%",
        height: 70,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        // backgroundColor:'yellow'
    },
    textAnswer: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
