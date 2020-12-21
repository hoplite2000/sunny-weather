import { GET_INFO_FAIL, GET_INFO_REQUEST, GET_INFO_SUCCESS } from '../constants/infoconstants';
import axios from 'axios';

export const getinfoaction = (location) => async (dispatch) => {
    try {
        dispatch({ type: GET_INFO_REQUEST });

        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.REACT_APP_API_KEY}`);
        dispatch({
            type: GET_INFO_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_INFO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};