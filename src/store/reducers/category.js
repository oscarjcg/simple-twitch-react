import * as actionTypes from '../actions/actionTypes'

const initialState = {
    categories: null
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CATEGORIES_SUCCESS:           
            return {
                categories: action.categories
            }           
        default:
    
            return state;
    }
}

export default reducer;