import { FETCH_USER_PENDING, FETCH_USER_REJECT, FETCH_USER_SUCCESS,FETCH_FRIENDLIST_SUCCESS , FETCH_FRIENDLIST_PENDING } from "../actions/actionType";

const initialState = {
    fetchUserLoading: true,
    user: {},
    errorMsg: "",
    friendRequest:[],
    fetchFriendRequestLoading:true
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
        case FETCH_FRIENDLIST_SUCCESS:
            return{
                ...state,
                friendRequest: action.payload,
                fetchFriendRequestLoading:false
            }
        case FETCH_FRIENDLIST_PENDING:
            return{
                ...state,
                fetchFriendRequestLoading:true
            }
        default:
            return state;
    }
}

export default userReducer;