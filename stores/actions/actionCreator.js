import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../helpers/ip";
import { FETCH_POSTS_PENDING, FETCH_POSTS_REJECT, FETCH_POSTS_SUCCESS, FETCH_USER_PENDING, FETCH_USER_SUCCESS } from "./actionType";

import { FETCH_POST_PENDING, FETCH_POST_REJECT, FETCH_POST_SUCCESS } from "./actionType";

const fetchPostsPending = () => ({
    type: FETCH_POSTS_PENDING,
});

const fetchPostsSuccess = (responseJSON) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: responseJSON,
});

const fetchPostsReject = (errorMessage) => ({
    type: FETCH_POSTS_REJECT,
    payload: errorMessage,
});

const fetchUserPending = () => ({
    type: FETCH_USER_PENDING,
});

const fetchUserSuccess = (data) => ({
    type: FETCH_USER_SUCCESS,
    payload: data,
});

const fetchUserReject = (data) => ({
    payload: data,
});
export const fetchPosts = (categoryId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchPostsPending());
            const { data } = await axios({
                method: "GET",
                url: `http://${BASE_URL}:3000/posts/${categoryId}`,
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                },
            });
            dispatch(fetchPostsSuccess(data));
        } catch (err) {
            dispatch(fetchPostsReject(err));
            throw err;
        }
    };
};

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
            console.log(await AsyncStorage.getItem("access_token"));
        } catch (err) {
            throw err;
        }
    };

export const fetchUser = () => async (dispatch) => {
    const userId = await AsyncStorage.getItem("userId");
    try {
        dispatch(fetchUserPending());
        const { data } = await axios({
            method: "get",
            url: `http://${BASE_URL}:3001/users/${userId}`,
        });
        console.log(data);
        dispatch(fetchUserSuccess(data));
    } catch (err) {
        console.log(err, "<<<<error");
        dispatch(fetchUserReject(err));
    }
};
const fetchPostPending = () => ({
    type: FETCH_POST_PENDING,
});

const fetchPostSuccess = (responseJSON) => ({
    type: FETCH_POST_SUCCESS,
    payload: responseJSON,
});

const fetchPostReject = (errorMessage) => ({
    type: FETCH_POST_REJECT,
    payload: errorMessage,
});

export const fetchPost = (postId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchPostPending());
            const { data } = await axios({
                method: "GET",
                url: `http://${BASE_URL}:3000/posts/postDetail/${postId}`,
                headers: {
                    access_token: await AsyncStorage.getItem("access_token"),
                },
            });

            dispatch(fetchPostSuccess(data));
        } catch (err) {
            dispatch(fetchPostReject(err));
            throw err;
        }
    };
};
