import { FETCH_USER_PENDING, FETCH_USER_REJECT, FETCH_USER_SUCCESS, FETCH_FRIENDLIST_SUCCESS, FETCH_FRIENDLIST_PENDING, FETCH_FRIENDLIST_REJECT } from "../actions/actionType";

const initialState = {
    fetchUserLoading: true,
    user: {},
    errorMsg: "",
    friendRequest: [],
    fetchFriendRequestLoading: true,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PENDING:
            return {
                ...initialState,
                fetchUserLoading: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                fetchUserLoading: false,
                user: action.payload,
            };
        case FETCH_USER_REJECT:
            return {
                ...state,
                fetchUserLoading: false,
                errorMsg: action.payload,
            };
        case FETCH_FRIENDLIST_SUCCESS:
            return {
                ...state,
                friendRequest: action.payload,
                fetchFriendRequestLoading: false,
            };
        case FETCH_FRIENDLIST_PENDING:
            return {
                ...initialState,
                fetchFriendRequestLoading: true,
            };
        case FETCH_FRIENDLIST_REJECT:
            return {
                ...state,
                errorMsg: action.payload,
                fetchFriendRequestLoading: false,
            };
        default:
            return state;
    }
}

export default userReducer;
