import React, { useState, useEffect } from "react"
import {
    Button,
    Image,
    View,
    Platform,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BASE_URL } from "../helpers/ip"
import { Text } from "react-native"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../stores/actions/actionCreator"
export default function EditProfile({ navigation }) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [imageData, setImageData] = useState(null)
    const [profileName, setProfileName] = useState("")
    const { user, loading } = useSelector((state) => {
        return state.user
    })
    useEffect(() => {
        dispatch(fetchUser())
    }, [])
    useEffect(() => {
        setProfileName(user?.profileName)
    }, [])
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        let localUri = result.uri
        if (!result.canceled) {
            const uri = result.assets[0].uri
            const filename = uri.split("/").pop()
            const formData = new FormData()
            formData.append("image", {
                uri,
                name: filename,
                type: "image/jpeg",
            })
            formData.append("profileName", profileName)
            setImage(uri)
            setImageData(formData)
        }
    }
    const getDataValue = (e) => {
        setProfileName(e)
    }
    const uploadFileAndString = async (file, myString) => {
        try {
            const access_token = await AsyncStorage.getItem("access_token")
            console.log(access_token)
            const response = await axios.put(
                `http://${BASE_URL}:3001/users/editProfile`,
                imageData,
                {
                    accept: "application/json",
                    "Accept-Language": "en-US,en;q=0.8",
                    headers: {
                        access_token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            dispatch(fetchUser())
            navigation.navigate("ProfileScreen")
        } catch (error) {
            console.log(error.name)
        }
    }
    console.log(profileName)
    if (loading) {
        return (
            <View>
                <Text>LOADING YOYOOYOYOYYy!!!</Text>
            </View>
        )
    }

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <View>
                <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                />
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
            </View>
            <TextInput
                placeholderTextColor="#C0C0C0"
                placeholder="Profile Name"
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                style={styles.textInput}
                defaultValue={profileName}
                onChangeText={getDataValue}
            />
            <TouchableOpacity onPress={uploadFileAndString}>
                <Text>SAVE!!!!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 300,
        marginBottom: 10,
        marginTop: 5,
    },
    container: {
        // flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE59E",
    },
    textContainer: {
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    textHeader: {
        textAlign: "center",
        marginBottom: 9,
        fontSize: 20,
        color: "#8d4e42",
        fontWeight: "bold",
    },
    text: {
        marginTop: 23,
        color: "#8d4e42",
        fontWeight: "bold",
        fontSize: 18,
    },
    textInputContainer: {
        // flex: 1,
        marginTop: 80,
        width: "90%",
        height: "40%",
        marginBottom: 3,
    },
    textInput: {
        textAlignVertical: "center",
        flexDirection: "row",
        padding: 5,
        paddingLeft: 15,
        fontSize: 15,
        // flex: 2,
        marginTop: 10,
        borderRadius: 30,
        paddingTop: 5,
        height: "15%",
        backgroundColor: "white",
    },
    button: {
        marginTop: 5,
        width: "60%",
        height: "8%",
        marginBottom: 74,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: "#8d4e42",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
})
