import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    channels: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CHANNELS_SUCCESS:  
            return updateObject(state, {channels: action.channels});
        default:
            return state;            
    };
};

export default reducer;