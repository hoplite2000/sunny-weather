import { GET_INFO_FAIL, GET_INFO_REQUEST, GET_INFO_SUCCESS } from '../constants/infoconstants';

export const getinfoReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_INFO_REQUEST:
            return { loading: true, ...state };
        case GET_INFO_SUCCESS:
            return { loading: false, info: action.payload };
        case GET_INFO_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}