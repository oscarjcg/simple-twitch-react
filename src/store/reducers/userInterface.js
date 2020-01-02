import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    headerHeight: null,
    headerChannelWidth: null
};

const updateHeaderHeight = (state, action) => {
    return updateObject(state, {
        headerHeight: action.headerHeight
    }); 
};

const updateHedaerChannelWidth = (state, action) => {
    return updateObject(state, {        
        headerChannelWidth: action.headerChannelWidth        
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_HEADER_HEIGHT:           
            return updateHeaderHeight(state, action);
        case actionTypes.UPDATE_HEADER_CHANNEL_WIDTH:           
            return updateHedaerChannelWidth(state, action);   
        default:    
            return state;
    };
};

export default reducer;