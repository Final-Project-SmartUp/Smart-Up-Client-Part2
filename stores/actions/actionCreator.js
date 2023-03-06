import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = `192.168.9.117`;

export const login =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            const { data } = await axios({
                method: "post",
                url: `http://${BASE_URL}:3001/users/login`,
                data: {
                    email,
                    password,
                },
            });
            await AsyncStorage.setItem("access_token", data.access_token);
            await AsyncStorage.setItem("userId", data.id);
            await AsyncStorage.setItem("username", data.username);
        } catch (err) {
            throw err;
        }
    };
