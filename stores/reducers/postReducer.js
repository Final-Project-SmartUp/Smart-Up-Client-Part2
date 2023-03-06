import { FETCH_POSTS_PENDING, FETCH_POSTS_REJECT, FETCH_POSTS_SUCCESS } from "../actions/actionType";

const initialState = {
    fetchPostsLoading: true,
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

        default:
            return state;
    }
}

export default postReducer;
