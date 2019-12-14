import * as actionTypes from '../actions/actionTypes'

const initialState = {
    headerHeight: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_HEADER_HEIGHT:           
            return {
                headerHeight: action.headerHeight
            };           
        default:    
            return state;
    }
}

export default reducer;