import { FETCH_USER_PENDING, FETCH_USER_REJECT, FETCH_USER_SUCCESS } from "../actions/actionType";

const initialState = {
    fetchUserLoading: true,
    user: {},
    errorMsg: "",
};


function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PENDING:
            return {
                ...initialState,
                fetchPostsLoading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                fetchPostsLoading: false,
                user: action.payload,
            };
        case FETCH_USER_REJECT:
            return {
                ...state,
                fetchPostsLoading: false,
                errorMsg: action.payload,
            };

        default:
            return state;
    }
}

export default userReducer;