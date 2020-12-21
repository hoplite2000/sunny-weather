import { GET_INFO_FAIL, GET_INFO_REQUEST, GET_INFO_SUCCESS } from '../constants/infoconstants';
import axios from 'axios';

export const getinfoaction = (location) => async (dispatch) => {
    try {
        dispatch({ type: GET_INFO_REQUEST });

        const appid = await axios.get('/api/appid');
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appid.data}`);
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