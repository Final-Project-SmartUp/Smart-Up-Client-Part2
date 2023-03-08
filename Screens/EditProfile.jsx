import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../helpers/ip";
import { Text } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../stores/actions/actionCreator";
import Loading from "../Components/Loading";
import ProfilePicture from "../Components/ProfilePicture";

export default function EditProfile({ navigation }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [profileName, setProfileName] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const { user, loading } = useSelector((state) => {
        return state.user;
    });
    useEffect(() => {
        dispatch(fetchUser());
    }, []);
    useEffect(() => {
        setProfileName(user?.profileName);
        setImage(user?.image);
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        let localUri = result.uri;
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const filename = uri.split("/").pop();
            const formData = new FormData();
            formData.append("image", {
                uri,
                name: filename,
                type: "image/jpeg",
            });
            formData.append("profileName", profileName);
            setImage(uri);
            setImageData(formData);
        }
    };

    const getDataValue = (e) => {
        setProfileName(e);
    };
    const uploadFileAndString = async (file, myString) => {
        try {
            setLoadingUpdate(true);
            const access_token = await AsyncStorage.getItem("access_token");
            const response = await axios.put(`http://${BASE_URL}:3001/users/editProfile`, imageData, {
                accept: "application/json",
                "Accept-Language": "en-US,en;q=0.8",
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch(fetchUser());
            setLoadingUpdate(false);
            navigation.navigate("ProfileScreen");
        } catch (error) {
            console.log(error.name);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (loadingUpdate) {
        return <Loading />;
    }

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.fontHeader}>EDIT PROFILE</Text>
                <View style={styles.wrappedEdit}>
                    <View style={styles.editContainer}>
                        <View style={styles.profileImage}>
                            {image ? (
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: image,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
                                    }}
                                />
                            )}
                        </View>
                        <View>
                            <Button title="Pick an image from camera roll" onPress={pickImage} />
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.fontInput}>Username:</Text>
                            <TextInput style={styles.textInput} placeholderTextColor="#C0C0C0" placeholder="Profile Name" editable multiline numberOfLines={4} maxLength={40} defaultValue={user?.profileName} onChangeText={getDataValue} />
                            <Text style={styles.fontEmailContainer}>Email:</Text>
                            <View style={styles.textInput}>
                                <Text style={[styles.fontInput, { color: "grey" }]}>hilu@mail.com</Text>
                            </View>
                            <TouchableOpacity onPress={uploadFileAndString} style={styles.button}>
                                <Text style={styles.textButton}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#92C8C7",
        paddingTop: 40,
        //   backgroundColor:'red'
    },
    header: {
        //   backgroundColor: "yellow",
        width: "100%",
        height: "10%",
    },
    fontHeader: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    editContainer: {
        marginTop: 90,
        width: "100%",
        height: "220%",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "center",
    },
    profileImage: {
        backgroundColor: "#D3ECEB",
        width: "30%",
        height: "20%",
        marginBottom: 20,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
    },
    textInputContainer: {
        height: "50%",
        marginTop: 30,
        width: "90%",
        justifyContent: "center",
        backgroundColor: "#D3ECEB",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 30,
        paddingTop: 15,
    },
    fontInput: {
        fontWeight: "bold",
        fontSize: 15,
    },
    editProfileImage: {
        width: "40%",
        height: "30%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        textAlignVertical: "center",
        flexDirection: "row",
        padding: 10,
        paddingLeft: 15,
        fontSize: 15,
        marginTop: 10,
        borderRadius: 30,
        paddingTop: 13,
        height: 50,
        width: "100%",
        backgroundColor: "white",
    },
    fontEmailContainer: {
        marginTop: 20,
        fontSize: 15,
    },
    button: {
        marginTop: 20,
        width: "60%",
        height: "15%",
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 75,
    },
    textButton: {
        color: "#0A7F7F",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
});
