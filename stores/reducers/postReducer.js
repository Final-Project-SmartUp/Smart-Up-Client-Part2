import { FETCH_POSTS_PENDING, FETCH_POSTS_REJECT, FETCH_POSTS_SUCCESS, FETCH_POST_PENDING, FETCH_POST_REJECT, FETCH_POST_SUCCESS } from "../actions/actionType";

const initialState = {
    fetchPostsLoading: true,
    fetchPostLoading: true,
    post: {},
    posts: [],
    errorMsg: "",
};

function postReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_PENDING:
            return {
                ...initialState,
                fetchPostsLoading: true,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                fetchPostsLoading: false,
                posts: action.payload,
            };
        case FETCH_POSTS_REJECT:
            return {
                ...state,
                fetchPostsLoading: false,
                errorMsg: action.payload,
            };
        case FETCH_POST_PENDING:
            return {
                ...initialState,
                fetchPostLoading: true,
            };
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                fetchPostLoading: false,
                post: action.payload,
            };
        case FETCH_POST_REJECT:
            return {
                ...state,
                fetchPostLoading: false,
                errorMsg: action.payload,
            };
        default:
            return state;
    }
}

export default postReducer;
